"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Thermometer,
  Activity,
  Target,
  Settings,
} from "lucide-react"

interface SimulationState {
  operationMode: "grid-connected" | "islanded"
  renewablePenetration: number
  batteryCapacity: number
  backupGenerators: boolean
  loadShifting: boolean
  climateEvent: "none" | "heatwave" | "storm" | "flood" | "wildfire"
  gridStability: number
}

interface PredictiveAnalyticsProps {
  simulation: SimulationState
}

interface PredictedEvent {
  type: string
  probability: number
  timeToEvent: number
  severity: "low" | "medium" | "high"
  impact: string
}

interface AutomatedAction {
  id: string
  action: string
  status: "pending" | "active" | "completed"
  effectiveness: number
  description: string
  energySaving: number
}

export function PredictiveAnalytics({ simulation }: PredictiveAnalyticsProps) {
  const [autoResponseEnabled, setAutoResponseEnabled] = useState(true)
  const [mlModelAccuracy, setMlModelAccuracy] = useState(94.2)

  // Generate predictive data based on simulation state
  const predictiveData = useMemo(() => {
    const baseHeatRisk = simulation.climateEvent === "heatwave" ? 85 : simulation.climateEvent === "wildfire" ? 70 : 25

    const predictedEvents: PredictedEvent[] = [
      {
        type: "Temperature Spike",
        probability: simulation.climateEvent === "heatwave" ? 92 : 15,
        timeToEvent: 2.5,
        severity: simulation.climateEvent === "heatwave" ? "high" : "low",
        impact: "Server performance degradation",
      },
      {
        type: "Cooling System Overload",
        probability: simulation.climateEvent === "heatwave" ? 78 : 8,
        timeToEvent: 4.0,
        severity: simulation.climateEvent === "heatwave" ? "high" : "low",
        impact: "Increased power consumption",
      },
      {
        type: "Power Grid Instability",
        probability: simulation.climateEvent === "storm" ? 65 : 12,
        timeToEvent: 1.8,
        severity: simulation.climateEvent === "storm" ? "medium" : "low",
        impact: "Potential service interruption",
      },
      {
        type: "Battery Depletion",
        probability: simulation.batteryCapacity < 30 ? 55 : 10,
        timeToEvent: 6.2,
        severity: simulation.batteryCapacity < 30 ? "medium" : "low",
        impact: "Reduced backup capacity",
      },
    ]

    const automatedActions: AutomatedAction[] = [
      {
        id: "load-shift-1",
        action: "Preemptive Load Shifting",
        status: simulation.loadShifting ? "active" : "pending",
        effectiveness: 87,
        description: "Shift non-critical workloads to off-peak hours",
        energySaving: 15,
      },
      {
        id: "cooling-opt-1",
        action: "Cooling Optimization",
        status: simulation.climateEvent === "heatwave" ? "active" : "completed",
        effectiveness: 92,
        description: "Adjust cooling setpoints based on predicted temperature",
        energySaving: 12,
      },
      {
        id: "bess-charge-1",
        action: "BESS Pre-charging",
        status: simulation.batteryCapacity > 80 ? "completed" : "active",
        effectiveness: 95,
        description: "Charge battery systems before predicted peak demand",
        energySaving: 8,
      },
      {
        id: "renewable-max-1",
        action: "Renewable Maximization",
        status: simulation.renewablePenetration > 60 ? "active" : "pending",
        effectiveness: 89,
        description: "Optimize renewable energy utilization",
        energySaving: 22,
      },
    ]

    return {
      heatRiskScore: baseHeatRisk,
      predictedEvents,
      automatedActions,
      telemetryData: {
        serverTemps: [24, 26, 28, 25, 27, 29].map((temp) =>
          simulation.climateEvent === "heatwave" ? temp + 18 : temp,
        ),
        coolingEfficiency: simulation.climateEvent === "heatwave" ? 65 : 88,
        powerConsumption: 150 * (simulation.climateEvent === "heatwave" ? 1.3 : 1.0),
        weatherConditions: {
          temperature: simulation.climateEvent === "heatwave" ? 42 : 24,
          humidity: simulation.climateEvent === "storm" ? 85 : 45,
          windSpeed: simulation.climateEvent === "storm" ? 65 : 12,
        },
      },
    }
  }, [simulation])

  // Generate time series prediction data
  const predictionTimeSeries = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const baseTemp = 24 + 8 * Math.sin((i * Math.PI) / 12)
      const heatWaveEffect = simulation.climateEvent === "heatwave" ? 15 * Math.sin((i * Math.PI) / 8) : 0

      return {
        hour: i,
        predicted: baseTemp + heatWaveEffect,
        actual: baseTemp + heatWaveEffect + (Math.random() - 0.5) * 2,
        confidence: 85 + Math.random() * 10,
        riskLevel: baseTemp + heatWaveEffect > 35 ? "high" : baseTemp + heatWaveEffect > 28 ? "medium" : "low",
      }
    })
  }, [simulation.climateEvent])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "completed":
        return "secondary"
      case "pending":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Model Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heat Risk Score</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{predictiveData.heatRiskScore}</div>
            <Progress value={predictiveData.heatRiskScore} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {predictiveData.heatRiskScore > 70
                ? "High Risk"
                : predictiveData.heatRiskScore > 40
                  ? "Medium Risk"
                  : "Low Risk"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ML Model Accuracy</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mlModelAccuracy}%</div>
            <Progress value={mlModelAccuracy} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Last updated: 2 min ago</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Predictions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {predictiveData.predictedEvents.filter((e) => e.probability > 50).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">High confidence events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto Actions</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {predictiveData.automatedActions.filter((a) => a.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Currently executing</p>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>24-Hour Temperature Prediction</CardTitle>
            <CardDescription>ML-powered temperature forecasting with confidence intervals</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                predicted: { label: "Predicted", color: "hsl(var(--chart-1))" },
                actual: { label: "Actual", color: "hsl(var(--chart-2))" },
                confidence: { label: "Confidence", color: "hsl(var(--chart-3))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={predictionTimeSeries}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="var(--color-predicted)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk vs Impact Analysis</CardTitle>
            <CardDescription>Predicted events plotted by probability and impact</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                events: { label: "Events", color: "hsl(var(--chart-1))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  data={predictiveData.predictedEvents.map((event) => ({
                    x: event.probability,
                    y: event.timeToEvent,
                    name: event.type,
                    severity: event.severity,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" name="Probability %" />
                  <YAxis dataKey="y" name="Time to Event (hours)" />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white p-2 border rounded shadow">
                            <p className="font-semibold">{data.name}</p>
                            <p>Probability: {data.x}%</p>
                            <p>Time: {data.y}h</p>
                            <p>Severity: {data.severity}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Scatter dataKey="y" fill="var(--color-events)" />
                </ScatterChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Predicted Events */}
      <Card>
        <CardHeader>
          <CardTitle>Predicted Events</CardTitle>
          <CardDescription>AI-generated predictions based on weather and telemetry data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictiveData.predictedEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle
                    className={`h-5 w-5 ${
                      event.severity === "high"
                        ? "text-red-500"
                        : event.severity === "medium"
                          ? "text-yellow-500"
                          : "text-gray-500"
                    }`}
                  />
                  <div>
                    <div className="font-semibold">{event.type}</div>
                    <div className="text-sm text-muted-foreground">{event.impact}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={getSeverityColor(event.severity) as any}>{event.probability}% probability</Badge>
                  <div className="text-sm text-muted-foreground">{event.timeToEvent}h</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automated Response System */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Automated Response System</CardTitle>
              <CardDescription>Pre-emptive actions based on predictive analytics</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="auto-response">Auto Response</Label>
              <Switch id="auto-response" checked={autoResponseEnabled} onCheckedChange={setAutoResponseEnabled} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictiveData.automatedActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {action.status === "completed" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : action.status === "active" ? (
                    <Activity className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-500" />
                  )}
                  <div>
                    <div className="font-semibold">{action.action}</div>
                    <div className="text-sm text-muted-foreground">{action.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={getStatusColor(action.status) as any}>{action.status}</Badge>
                  <div className="text-sm text-muted-foreground">{action.effectiveness}% effective</div>
                  <div className="text-sm text-green-600">-{action.energySaving}% energy</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Server Temperature Distribution</CardTitle>
            <CardDescription>Real-time temperature monitoring across server racks</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                temperature: { label: "Temperature", color: "hsl(var(--chart-1))" },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={predictiveData.telemetryData.serverTemps.map((temp, i) => ({
                    rack: `R${i + 1}`,
                    temperature: temp,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="rack" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="temperature" fill="var(--color-temperature)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators from telemetry data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Cooling Efficiency</span>
              <div className="flex items-center gap-2">
                <Progress value={predictiveData.telemetryData.coolingEfficiency} className="w-20" />
                <span className="text-sm font-mono">{predictiveData.telemetryData.coolingEfficiency}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span>Power Consumption</span>
              <span className="font-mono">{predictiveData.telemetryData.powerConsumption.toFixed(0)} kW</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Ambient Temperature</span>
              <span className="font-mono">{predictiveData.telemetryData.weatherConditions.temperature}°C</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Humidity</span>
              <span className="font-mono">{predictiveData.telemetryData.weatherConditions.humidity}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Generated Recommendations</CardTitle>
          <CardDescription>Machine learning insights for optimal data center operation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <Target className="h-4 w-4" />
              <AlertDescription>
                <strong>Optimization Opportunity:</strong> Increase renewable penetration to 65% during predicted
                low-demand period (2-6 AM) to reduce carbon footprint by 18%.
              </AlertDescription>
            </Alert>

            <Alert>
              <Zap className="h-4 w-4" />
              <AlertDescription>
                <strong>Energy Efficiency:</strong> Implement predictive cooling based on weather forecast to achieve
                12% energy savings over next 48 hours.
              </AlertDescription>
            </Alert>

            {predictiveData.heatRiskScore > 60 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Heat Risk Alert:</strong> High temperature event predicted in{" "}
                  {predictiveData.predictedEvents[0]?.timeToEvent}h. Recommend pre-cooling and load shifting to critical
                  systems only.
                </AlertDescription>
              </Alert>
            )}

            <Alert>
              <Brain className="h-4 w-4" />
              <AlertDescription>
                <strong>Predictive Maintenance:</strong> Cooling Unit AC01 showing efficiency degradation pattern.
                Schedule maintenance within 72 hours to prevent failure.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
