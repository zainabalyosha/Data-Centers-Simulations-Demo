"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, Clock, Flame, Shield, Thermometer, TrendingUp, Zap } from "lucide-react"
import { Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface AutomatedPlanProps {
  simulation: any
  location: any
  metrics: any
}

interface PlanStep {
  id: string
  title: string
  description: string
  triggerCondition: string
  executionTime: number // minutes from trigger
  duration: number // minutes
  status: "pending" | "ready" | "executing" | "completed"
  successProbability: number
  impact: {
    coolingReduction: number
    powerSaving: number
    riskMitigation: number
  }
  dependencies: string[]
}

interface HeatwavePlan {
  id: string
  name: string
  description: string
  triggerTemp: number
  overallSuccessProbability: number
  steps: PlanStep[]
  historicalPerformance: {
    timesExecuted: number
    successRate: number
    avgDuration: number
  }
}

export function AutomatedPlan({ simulation, location, metrics }: AutomatedPlanProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("moderate")

  const generatePlans = (): Record<string, HeatwavePlan> => {
    return {
      moderate: {
        id: "moderate",
        name: "Moderate Heatwave Response",
        description: "Automated response for temperatures 8-15°C above normal",
        triggerTemp: location.avgSummerTemp + 8,
        overallSuccessProbability: 92,
        historicalPerformance: {
          timesExecuted: 12,
          successRate: 91.7,
          avgDuration: 180,
        },
        steps: [
          {
            id: "temp-monitor",
            title: "Enhanced Temperature Monitoring",
            description: "Increase sensor polling frequency and activate predictive algorithms",
            triggerCondition: `Temperature > ${location.avgSummerTemp + 8}°C`,
            executionTime: 0,
            duration: 30,
            status: simulation.heatwaveActive && simulation.heatwaveIntensity === "moderate" ? "executing" : "ready",
            successProbability: 99,
            impact: { coolingReduction: 0, powerSaving: 0, riskMitigation: 15 },
            dependencies: [],
          },
          {
            id: "precool",
            title: "Facility Pre-cooling",
            description: "Lower setpoints by 2°C to build thermal mass",
            triggerCondition: "Forecast shows sustained high temperatures",
            executionTime: 15,
            duration: 120,
            status: simulation.heatwaveActive && simulation.heatwaveIntensity === "moderate" ? "executing" : "ready",
            successProbability: 88,
            impact: { coolingReduction: 15, powerSaving: -10, riskMitigation: 35 },
            dependencies: ["temp-monitor"],
          },
          {
            id: "load-balance",
            title: "Intelligent Load Balancing",
            description: "Redistribute workloads to cooler zones and defer non-critical tasks",
            triggerCondition: "Server temperatures > 35°C",
            executionTime: 30,
            duration: 60,
            status: simulation.heatwaveActive && simulation.heatwaveIntensity === "moderate" ? "executing" : "ready",
            successProbability: 94,
            impact: { coolingReduction: 20, powerSaving: 12, riskMitigation: 40 },
            dependencies: ["temp-monitor"],
          },
          {
            id: "renewable-opt",
            title: "Renewable Energy Optimization",
            description: "Maximize solar generation and optimize battery charging cycles",
            triggerCondition: "Grid demand > 85%",
            executionTime: 45,
            duration: 180,
            status: simulation.renewablePenetration > 60 ? "completed" : "ready",
            successProbability: 85,
            impact: { coolingReduction: 0, powerSaving: 25, riskMitigation: 30 },
            dependencies: ["load-balance"],
          },
        ],
      },
      severe: {
        id: "severe",
        name: "Severe Heatwave Response",
        description: "Comprehensive response for temperatures 15-22°C above normal",
        triggerTemp: location.avgSummerTemp + 15,
        overallSuccessProbability: 87,
        historicalPerformance: {
          timesExecuted: 8,
          successRate: 87.5,
          avgDuration: 240,
        },
        steps: [
          {
            id: "emergency-cooling",
            title: "Emergency Cooling Activation",
            description: "Activate backup chillers and maximize cooling capacity",
            triggerCondition: `Temperature > ${location.avgSummerTemp + 15}°C`,
            executionTime: 0,
            duration: 45,
            status: simulation.heatwaveActive && simulation.heatwaveIntensity === "severe" ? "executing" : "ready",
            successProbability: 95,
            impact: { coolingReduction: 40, powerSaving: -25, riskMitigation: 70 },
            dependencies: [],
          },
          {
            id: "grid-disconnect",
            title: "Planned Grid Disconnection",
            description: "Switch to islanded mode to avoid grid instability",
            triggerCondition: "Grid stability < 80%",
            executionTime: 20,
            duration: 300,
            status: simulation.operationMode === "islanded" ? "completed" : "ready",
            successProbability: 82,
            impact: { coolingReduction: 0, powerSaving: 0, riskMitigation: 60 },
            dependencies: ["emergency-cooling"],
          },
          {
            id: "critical-load-shed",
            title: "Critical Load Shedding",
            description: "Shut down non-essential systems and migrate critical workloads",
            triggerCondition: "Cooling capacity < demand",
            executionTime: 35,
            duration: 90,
            status: simulation.loadShifting ? "completed" : "ready",
            successProbability: 90,
            impact: { coolingReduction: 35, powerSaving: 40, riskMitigation: 80 },
            dependencies: ["emergency-cooling", "grid-disconnect"],
          },
          {
            id: "backup-power",
            title: "Backup Generator Activation",
            description: "Start diesel generators for critical cooling systems",
            triggerCondition: "Battery capacity < 30%",
            executionTime: 60,
            duration: 480,
            status: simulation.backupGenerators ? "ready" : "pending",
            successProbability: 88,
            impact: { coolingReduction: 0, powerSaving: -15, riskMitigation: 85 },
            dependencies: ["grid-disconnect"],
          },
        ],
      },
      extreme: {
        id: "extreme",
        name: "Extreme Heatwave Emergency",
        description: "Emergency protocols for temperatures >22°C above normal",
        triggerTemp: location.avgSummerTemp + 22,
        overallSuccessProbability: 78,
        historicalPerformance: {
          timesExecuted: 3,
          successRate: 66.7,
          avgDuration: 360,
        },
        steps: [
          {
            id: "emergency-shutdown",
            title: "Partial Emergency Shutdown",
            description: "Shut down 50% of non-critical systems immediately",
            triggerCondition: `Temperature > ${location.avgSummerTemp + 22}°C`,
            executionTime: 0,
            duration: 15,
            status: simulation.heatwaveActive && simulation.heatwaveIntensity === "extreme" ? "executing" : "ready",
            successProbability: 98,
            impact: { coolingReduction: 50, powerSaving: 45, riskMitigation: 60 },
            dependencies: [],
          },
          {
            id: "max-cooling",
            title: "Maximum Cooling Deployment",
            description: "Deploy all available cooling resources including mobile units",
            triggerCondition: "Emergency shutdown completed",
            executionTime: 10,
            duration: 60,
            status: simulation.heatwaveActive && simulation.heatwaveIntensity === "extreme" ? "executing" : "ready",
            successProbability: 85,
            impact: { coolingReduction: 60, powerSaving: -40, riskMitigation: 85 },
            dependencies: ["emergency-shutdown"],
          },
          {
            id: "workload-migration",
            title: "Emergency Workload Migration",
            description: "Migrate all critical workloads to remote facilities",
            triggerCondition: "Local cooling insufficient",
            executionTime: 30,
            duration: 120,
            status: "ready",
            successProbability: 75,
            impact: { coolingReduction: 70, powerSaving: 60, riskMitigation: 95 },
            dependencies: ["emergency-shutdown", "max-cooling"],
          },
          {
            id: "facility-evacuation",
            title: "Controlled Facility Shutdown",
            description: "Graceful shutdown of remaining systems if cooling fails",
            triggerCondition: "Temperature > critical threshold",
            executionTime: 180,
            duration: 60,
            status: "pending",
            successProbability: 95,
            impact: { coolingReduction: 100, powerSaving: 90, riskMitigation: 100 },
            dependencies: ["workload-migration"],
          },
        ],
      },
    }
  }

  const plans = generatePlans()
  const currentPlan = plans[selectedPlan]

  // Determine which plan would be automatically triggered
  const getActivePlan = () => {
    if (simulation.currentTemp >= location.avgSummerTemp + 22) return "extreme"
    if (simulation.currentTemp >= location.avgSummerTemp + 15) return "severe"
    if (simulation.currentTemp >= location.avgSummerTemp + 8) return "moderate"
    return null
  }

  const activePlan = getActivePlan()

  // Generate success probability timeline
  const generateSuccessTimeline = () => {
    return currentPlan.steps.map((step, index) => ({
      step: index + 1,
      name: step.title,
      probability: step.successProbability,
      cumulativeProbability:
        currentPlan.steps.slice(0, index + 1).reduce((acc, s) => acc * (s.successProbability / 100), 1) * 100,
    }))
  }

  const getStepStatus = (step: PlanStep) => {
    if (step.status === "executing") return { color: "bg-blue-500", text: "Executing" }
    if (step.status === "completed") return { color: "bg-green-500", text: "Completed" }
    if (step.status === "ready") return { color: "bg-yellow-500", text: "Ready" }
    return { color: "bg-gray-400", text: "Pending" }
  }

  return (
    <div className="space-y-6">
      {/* Plan Selection and Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Automated Response Plans</CardTitle>
            <CardDescription>AI-driven response plans based on historical data and current conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.values(plans).map((plan) => (
                <div
                  key={plan.id}
                  className={`p-3 border rounded-
                <div
                  key={plan.id}
                  className={\`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedPlan === plan.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  } ${activePlan === plan.id ? "ring-2 ring-orange-500" : ""}`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold flex items-center gap-2">
                        {plan.name}
                        {activePlan === plan.id && (
                          <Badge variant="destructive" className="animate-pulse">
                            ACTIVE
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">Trigger: {plan.triggerTemp}°C</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{plan.overallSuccessProbability}%</div>
                      <div className="text-xs text-muted-foreground">Success Rate</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Plan Status</CardTitle>
            <CardDescription>
              {currentPlan.name} - {currentPlan.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{currentPlan.overallSuccessProbability}%</div>
                  <div className="text-sm text-muted-foreground">Success Probability</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{currentPlan.steps.length}</div>
                  <div className="text-sm text-muted-foreground">Total Steps</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Historical Performance</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Times Executed:</span>
                    <span className="font-mono">{currentPlan.historicalPerformance.timesExecuted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate:</span>
                    <span className="font-mono">{currentPlan.historicalPerformance.successRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Duration:</span>
                    <span className="font-mono">{currentPlan.historicalPerformance.avgDuration} min</span>
                  </div>
                </div>
              </div>

              {activePlan === currentPlan.id && (
                <Alert>
                  <Flame className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Plan Active:</strong> This plan is currently being executed based on temperature conditions.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Execution Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Execution Timeline - {currentPlan.name}</CardTitle>
          <CardDescription>Step-by-step automated response with success probabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentPlan.steps.map((step, index) => {
              const status = getStepStatus(step)
              const isActive = activePlan === currentPlan.id && step.status === "executing"

              return (
                <div key={step.id} className={`relative ${isActive ? "animate-pulse" : ""}`}>
                  {index < currentPlan.steps.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full ${status.color} flex items-center justify-center text-white font-bold`}
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={status.text === "Executing" ? "default" : "outline"}>{status.text}</Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Trigger:</span>
                          <div className="font-mono text-xs">{step.triggerCondition}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Execution:</span>
                          <div className="font-mono">T+{step.executionTime}min</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <div className="font-mono">{step.duration}min</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Success Rate:</span>
                          <div className="font-mono">{step.successProbability}%</div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="text-sm text-muted-foreground mb-1">Expected Impact:</div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <Thermometer className="w-3 h-3" />
                            <span>
                              Cooling: {step.impact.coolingReduction >= 0 ? "+" : ""}
                              {step.impact.coolingReduction}%
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            <span>
                              Power: {step.impact.powerSaving >= 0 ? "+" : ""}
                              {step.impact.powerSaving}%
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            <span>Risk: -{step.impact.riskMitigation}%</span>
                          </div>
                        </div>
                      </div>

                      {step.dependencies.length > 0 && (
                        <div className="mt-2">
                          <span className="text-xs text-muted-foreground">Dependencies: </span>
                          {step.dependencies.map((dep, i) => (
                            <Badge key={i} variant="outline" className="text-xs mr-1">
                              {dep}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Success Probability Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Success Probability by Step</CardTitle>
            <CardDescription>Individual and cumulative success rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                probability: { label: "Individual Success %", color: "hsl(var(--chart-1))" },
                cumulative: { label: "Cumulative Success %", color: "hsl(var(--chart-2))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={generateSuccessTimeline()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="step" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="probability" fill="var(--color-probability)" />
                  <Line type="monotone" dataKey="cumulative" stroke="var(--color-cumulative)" strokeWidth={2} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan Comparison</CardTitle>
            <CardDescription>Success rates across different heatwave intensities</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                successRate: { label: "Success Rate %", color: "hsl(var(--chart-1))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={Object.values(plans).map((plan) => ({
                    name: plan.name.split(" ")[0],
                    successRate: plan.overallSuccessProbability,
                    executed: plan.historicalPerformance.timesExecuted,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="successRate" fill="var(--color-successRate)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Climate Change Impact on Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Climate Change Impact on Plan Effectiveness</CardTitle>
          <CardDescription>How rising temperatures affect automated response success rates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert>
              <TrendingUp className="h-4 w-4" />
              <AlertDescription>
                <strong>Projection:</strong> By 2030, extreme heatwave events in {location.name} are expected to
                increase by 60%, requiring more frequent activation of severe and extreme response plans.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="text-lg font-bold text-orange-600">2025-2027</div>
                <div className="text-sm text-orange-600">Moderate plan effectiveness: 92% → 88%</div>
                <div className="text-xs text-muted-foreground">Increased cooling demands</div>
              </div>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-lg font-bold text-red-600">2028-2030</div>
                <div className="text-sm text-red-600">Severe plan effectiveness: 87% → 82%</div>
                <div className="text-xs text-muted-foreground">Grid instability increases</div>
              </div>
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="text-lg font-bold text-purple-600">2030+</div>
                <div className="text-sm text-purple-600">New extreme+ plan needed</div>
                <div className="text-xs text-muted-foreground">Beyond current thresholds</div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-3">Recommended Plan Improvements</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Increase battery storage capacity by 100% by 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Install additional backup cooling systems rated for 50°C+ operation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">
                    Develop partnerships with remote data centers for emergency workload migration
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">Implement AI-driven predictive cooling to extend response time</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
