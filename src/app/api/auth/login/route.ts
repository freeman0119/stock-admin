import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import type { ApiResponse, LoginResponseData } from '@/types/api';

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = loginSchema.parse(body);

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json<ApiResponse>({
        code: 401,
        success: false,
        message: '用户名或密码错误',
        data: null
      });
    }

    // 验证密码
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json<ApiResponse>({
        code: 401,
        success: false,
        message: '用户名或密码错误',
        data: null
      });
    }

    // 生成 JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // 返回统一格式的响应
    return NextResponse.json<ApiResponse<LoginResponseData>>({
      code: 200,
      success: true,
      message: '登录成功',
      data: {
        token,
        userInfo: {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json<ApiResponse>({
      code: 500,
      success: false,
      message: '登录失败，请重试',
      data: null
    });
  }
}