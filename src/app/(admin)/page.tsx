"use client";

import { Card, Row, Col, Statistic } from "antd";
import {
  AccountBookOutlined,
  StockOutlined,
  WalletOutlined,
} from "@ant-design/icons";

export default function DashboardPage() {
  // TODO: 这里的数据后续需要从API获取
  const stockData = {
    initialFund: 1000000,
    currentValue: 1250000,
    availableFund: 350000,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">仪表盘</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="初始资金"
              value={stockData.initialFund}
              precision={2}
              prefix={<AccountBookOutlined />}
              suffix="元"
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="当前市值"
              value={stockData.currentValue}
              precision={2}
              prefix={<StockOutlined />}
              suffix="元"
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="可用资金"
              value={stockData.availableFund}
              precision={2}
              prefix={<WalletOutlined />}
              suffix="元"
              valueStyle={{ color: "#1677ff" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
