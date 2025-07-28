"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle, DollarSign, Flame, Leaf, Power, Shield, Thermometer, TrendingDown, Zap } from "lucide-react"

interface RecommendedActionsProps {
  simulation: any
  location: any
  metrics: any
}

interface Action {
  id: string
  title: string
  description: string
  priority: "critical" | "high" | "medium" | "low"
  category: "cooling" | "power" | "load" | "infrastructure"
  costEstimate: string
  timeToImplement: string
  energySavings: number
  riskReduction: number
  effectiveness: number
  prerequisites: string[]
  icon: any
}

export function RecommendedActions({ simulation, location, metrics }: RecommendedActionsProps) {
  const generateActions = (): Action[] => {
    const actions: Action[] = []

    // Critical actions for extreme heat
    if (simulation.heatwaveActive && simulation.heatwaveIntensity === "extreme") {
      actions.push({
        id: "emergency-cooling",
        title: "Emergency Cooling Activation",
        description: "Activate all available cooling systems and emergency chillers to maintain critical temperatures",
        priority: "critical",
        category: "cooling",
        costEstimate: "$50,000/day",
        timeToImplement: "Immediate",
        energySavings: -30,
        riskReduction: 85,
        effectiveness: 95,
        prerequisites: ["Backup power available", "Emergency chillers operational"],
        icon: Thermometer,
      })

      actions.push({
        id: "load-shedding",
        title: "Critical Load Shedding",
        description: "Shut down non-essential systems and migrate critical workloads to cooler facilities",
        priority: "critical",
        category: "load",
        costEstimate: "$25,000/hour",
        timeToImplement: "15 minutes",
        energySavings: 40,
        riskReduction: 70,
        effectiveness: 90,
        prerequisites: ["Workload migration capability", "Remote facility capacity"],
        icon: Power,
      })
    }

    // High priority actions for severe heat
    if (
      simulation.heatwaveActive &&
      (simulation.heatwaveIntensity === "severe" || simulation.heatwaveIntensity === "extreme")
    ) {
      actions.push({
        id: "grid-disconnect",
        title: "Planned Grid Disconnection",
        description: "Switch to islanded mode to avoid grid instability during peak demand periods",
        priority: "high",
        category: "power",
        costEstimate: "$15,000/day",
        timeToImplement: "30 minutes",
        energySavings: 0,
        riskReduction: 60,
        effectiveness: 85,
        prerequisites: ["Battery capacity >70%", "Renewable generation available"],
        icon: Zap,
      })

      actions.push({
        id: "precooling",
        title: "Facility Pre-cooling",
        description: "Lower facility temperature during off-peak hours to build thermal mass",
        priority: "high",
        category: "cooling",
        costEstimate: "$8,000/day",
        timeToImplement: "2 hours",
        energySavings: 15,
        riskReduction: 45,
        effectiveness: 80,
        prerequisites: ["Off-peak electricity rates", "Thermal storage capacity"],
        icon: Flame,
      })
    }

    // Medium priority actions for moderate heat
    if (simulation.heatwaveActive) {
      actions.push({
        id: "renewable-max",
        title: "Maximize Renewable Generation",
        description: "Optimize solar panel angles and wind turbine operation for peak efficiency",
        priority: "medium",
        category: "power",
        costEstimate: "$2,000/day",
        timeToImplement: "1 hour",
        energySavings: 25,
        riskReduction: 30,
        effectiveness: 75,
        prerequisites: ["Solar tracking system", "Wind turbine control"],
        icon: Leaf,
      })

      actions.push({
        id: "demand-response",
        title: "Demand Response Participation",
        description: "Participate in utility demand response programs to reduce grid stress",
        priority: "medium",
        category: "load",
        costEstimate: "Revenue: $5,000/day",
        timeToImplement: "Immediate",
        energySavings: 20,
        riskReduction: 25,
        effectiveness: 70,
        prerequisites: ["Utility program enrollment", "Load flexibility"],
        icon: TrendingDown,
      })
    }

    // Long-term infrastructure improvements
    actions.push({
      id: "cooling-upgrade",
      title: "Advanced Cooling System Upgrade",
      description: "Install liquid cooling systems and improve airflow management for better heat dissipation",
      priority: "medium",
      category: "infrastructure",
      costEstimate: "$500,000",
      timeToImplement: "3 months",
      energySavings: 35,
      riskReduction: 80,
      effectiveness: 90,
      prerequisites: ["Capital budget approval", "Facility downtime window"],
      icon: Thermometer,
    })

    actions.push({
      id: "battery-expansion",
      title: "Battery Storage Expansion",
      description: "Add 50% more battery capacity to improve islanded operation duration",
      priority: "low",
      category: "infrastructure",
      costEstimate: "$750,000",
      timeToImplement: "6 months",
      energySavings: 10,
      riskReduction: 65,
      effectiveness: 85,
      prerequisites: ["Space availability", "Grid interconnection approval"],
      icon: Shield,
    })

    return actions.sort((a, b) => {
      const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    })
  }

  const actions = generateActions()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "destructive"
      case "high":
        return "secondary"
      case "medium":
        return "outline"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cooling":
        return Thermometer
      case "power":
        return Zap
      case "load":
        return TrendingDown
      case "infrastructure":
        return Shield
      default:
        return CheckCircle
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Action Priority Matrix</CardTitle>
          <CardDescription>Recommended actions based on current conditions in {location.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {actions.filter((a) => a.priority === "critical").length}
              </div>
              <div className="text-sm text-red-600">Critical Actions</div>
            </div>
            <div className="text-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {actions.filter((a) => a.priority === "high").length}
              </div>
              <div className="text-sm text-orange-600">High Priority</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {actions.filter((a) => a.priority === "medium").length}
              </div>
              <div className="text-sm text-yellow-600">Medium Priority</div>
            </div>
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {actions.filter((a) => a.priority === "low").length}
              </div>
              <div className="text-sm text-green-600">Long-term</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {actions.map((action) => {
          const IconComponent = action.icon
          const CategoryIcon = getCategoryIcon(action.category)

          return (
            <Card key={action.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getPriorityColor(action.priority) as any}>{action.priority}</Badge>
                    <Badge variant="outline">
                      <CategoryIcon className="w-3 h-3 mr-1" />
                      {action.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Cost Estimate</div>
                    <div className="font-semibold">{action.costEstimate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Implementation Time</div>
                    <div className="font-semibold">{action.timeToImplement}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Energy Impact</div>
                    <div className={`font-semibold ${action.energySavings >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {action.energySavings >= 0 ? "+" : ""}
                      {action.energySavings}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Risk Reduction</div>
                    <div className="font-semibold text-green-600">{action.riskReduction}%</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Effectiveness</span>
                      <span className="text-sm font-medium">{action.effectiveness}%</span>
                    </div>
                    <Progress value={action.effectiveness} className="h-2" />
                  </div>

                  {action.prerequisites.length > 0 && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Prerequisites:</div>
                      <div className="flex flex-wrap gap-1">
                        {action.prerequisites.map((prereq, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {prereq}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    {action.priority === "critical" && (
                      <Badge variant="destructive" className="animate-pulse">
                        URGENT
                      </Badge>
                    )}
                    {action.energySavings > 0 && (
                      <Badge variant="outline" className="text-green-600">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        Energy Savings
                      </Badge>
                    )}
                    {action.costEstimate.includes("Revenue") && (
                      <Badge variant="outline" className="text-green-600">
                        <DollarSign className="w-3 h-3 mr-1" />
                        Revenue Generating
                      </Badge>
                    )}
                  </div>
                  <Button variant={action.priority === "critical" ? "destructive" : "default"} size="sm">
                    {action.priority === "critical" ? "Execute Now" : "Plan Implementation"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cost-Benefit Analysis</CardTitle>
          <CardDescription>Financial impact of recommended actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                $
                {actions
                  .reduce((sum, action) => {
                    const cost = Number.parseInt(action.costEstimate.replace(/[^0-9]/g, "")) || 0
                    return sum + (action.costEstimate.includes("Revenue") ? 0 : cost)
                  }, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Implementation Cost</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {actions.reduce((sum, action) => sum + action.energySavings, 0)}%
              </div>
              <div className="text-sm text-muted-foreground">Total Energy Savings</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round(actions.reduce((sum, action) => sum + action.riskReduction, 0) / actions.length)}%
              </div>
              <div className="text-sm text-muted-foreground">Average Risk Reduction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
