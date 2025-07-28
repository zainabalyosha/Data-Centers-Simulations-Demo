"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Thermometer,
  Zap,
  Wind,
  Shield,
  Activity,
  MapPin,
  Calendar,
  TrendingUp,
  FileText,
} from "lucide-react"

interface IncidentHistoryProps {
  simulation: any
  location: any
}

export function IncidentHistory({ simulation, location }: IncidentHistoryProps) {
  // Historical incidents data for California data centers
  const incidents = [
    {
      id: "INC-2023-08-15",
      date: "August 15, 2023",
      location: "Los Angeles Primary (CA-LA-DC01)",
      eventType: "Extreme Heatwave",
      severity: "Critical",
      duration: "72 hours",
      maxTemp: 47,
      description:
        "Record-breaking heatwave with temperatures reaching 47°C, causing multiple cooling system failures and server thermal throttling.",
      impact: {
        serversAffected: 1200,
        uptimeReduction: 15.2,
        energyConsumption: "+180%",
        estimatedCost: "$2.4M",
      },
      actionsToken: [
        {
          time: "14:30",
          action: "Emergency cooling protocols activated",
          status: "completed",
          effectiveness: "high",
        },
        {
          time: "15:15",
          action: "Non-critical workloads migrated to San Diego backup facility",
          status: "completed",
          effectiveness: "high",
        },
        {
          time: "16:00",
          action: "Backup generators brought online to support additional cooling",
          status: "completed",
          effectiveness: "medium",
        },
        {
          time: "18:30",
          action: "Temporary chillers deployed from emergency reserves",
          status: "completed",
          effectiveness: "high",
        },
        {
          time: "20:00",
          action: "Server density reduced by 30% in affected zones",
          status: "completed",
          effectiveness: "high",
        },
      ],
      outcome:
        "Successfully maintained 84.8% uptime during crisis. No permanent hardware damage. Full operations restored within 6 hours of temperature normalization.",
      lessonsLearned: [
        "Need for additional redundant cooling capacity",
        "Importance of rapid workload migration capabilities",
        "Value of pre-positioned emergency equipment",
      ],
    },
    {
      id: "INC-2023-06-20",
      date: "June 20, 2023",
      location: "Sacramento Regional (CA-SAC-DC01)",
      eventType: "Power Grid Failure + Heatwave",
      severity: "High",
      duration: "48 hours",
      maxTemp: 44,
      description:
        "Simultaneous grid failure during moderate heatwave conditions, testing backup power and cooling systems.",
      impact: {
        serversAffected: 800,
        uptimeReduction: 8.5,
        energyConsumption: "+120%",
        estimatedCost: "$1.1M",
      },
      actionsToken: [
        {
          time: "11:45",
          action: "Automatic switchover to battery backup systems",
          status: "completed",
          effectiveness: "high",
        },
        {
          time: "12:00",
          action: "Diesel generators activated for extended operation",
          status: "completed",
          effectiveness: "high",
        },
        {
          time: "12:30",
          action: "Load balancing to reduce power consumption by 25%",
          status: "completed",
          effectiveness: "medium",
        },
        {
          time: "14:00",
          action: "Coordination with utility company for priority restoration",
          status: "completed",
          effectiveness: "medium",
        },
        {
          time: "16:15",
          action: "Fuel delivery secured for extended generator operation",
          status: "completed",
          effectiveness: "high",
        },
      ],
      outcome:
        "Maintained 91.5% uptime throughout the incident. Generators operated flawlessly for 48 hours. Grid power restored without service interruption.",
      lessonsLearned: [
        "Battery systems provided crucial bridging time",
        "Fuel supply chain coordination is critical",
        "Load reduction strategies are highly effective",
      ],
    },
    {
      id: "INC-2022-09-10",
      date: "September 10, 2022",
      location: "San Francisco Primary (CA-SF-DC01)",
      eventType: "Wildfire Smoke + High Temperature",
      severity: "Medium",
      duration: "96 hours",
      maxTemp: 38,
      description:
        "Dense wildfire smoke combined with elevated temperatures affected air intake systems and cooling efficiency.",
      impact: {
        serversAffected: 600,
        uptimeReduction: 3.2,
        energyConsumption: "+45%",
        estimatedCost: "$450K",
      },
      actionsToken: [
        {
          time: "09:00",
          action: "Air filtration systems upgraded to maximum capacity",
          status: "completed",
          effectiveness: "high",
        },
        {
          time: "10:30",
          action: "External air intake temporarily sealed",
          status: "completed",
          effectiveness: "high",
        },
        {
          time: "11:00",
          action: "Internal air recirculation mode activated",
          status: "completed",
          effectiveness: "medium",
        },
        {
          time: "14:00",
          action: "Cooling system efficiency monitoring increased",
          status: "completed",
          effectiveness: "medium",
        },
        {
          time: "16:00",
          action: "Preventive maintenance on air handling units",
          status: "completed",
          effectiveness: "high",
        },
      ],
      outcome:
        "Successfully maintained 96.8% uptime with minimal service impact. Air quality systems performed excellently.",
      lessonsLearned: [
        "Air filtration systems are critical for wildfire events",
        "Sealed recirculation mode is effective short-term solution",
        "Regular filter replacement schedule needs adjustment for fire season",
      ],
    },
    {
      id: "INC-2022-07-28",
      date: "July 28, 2022",
      location: "Fresno Edge (CA-FR-DC01)",
      eventType: "Extended Heatwave",
      severity: "High",
      duration: "168 hours (7 days)",
      maxTemp: 49,
      description: "Week-long extreme heatwave with consecutive days above 45°C, testing long-term resilience systems.",
      impact: {
        serversAffected: 450,
        uptimeReduction: 12.8,
        energyConsumption: "+200%",
        estimatedCost: "$800K",
      },
      actionsToken: [
        {
          time: "Day 1 - 13:00",
          action: "Enhanced cooling protocols initiated",
          status: "completed",
          effectiveness: "medium",
        },
        {
          time: "Day 2 - 08:00",
          action: "Workload migration to cooler facilities begun",
          status: "completed",
          effectiveness: "high",
        },
        {
          time: "Day 3 - 15:00",
          action: "Additional portable cooling units deployed",
          status: "completed",
          effectiveness: "high",
        },
        {
          time: "Day 4 - 10:00",
          action: "Staff rotation increased for 24/7 monitoring",
          status: "completed",
          effectiveness: "medium",
        },
        {
          time: "Day 6 - 12:00",
          action: "Emergency water supply secured for cooling systems",
          status: "completed",
          effectiveness: "high",
        },
      ],
      outcome: "Maintained 87.2% uptime over 7-day period. Demonstrated excellent long-term resilience capabilities.",
      lessonsLearned: [
        "Extended events require different strategies than short-term incidents",
        "Water supply for cooling becomes critical in extended heat",
        "Staff endurance and rotation planning is essential",
      ],
    },
    {
      id: "INC-2021-08-03",
      date: "August 3, 2021",
      location: "San Jose Tech Hub (CA-SJ-DC01)",
      eventType: "Rolling Blackouts + Heat",
      severity: "Medium",
      duration: "24 hours",
      maxTemp: 41,
      description:
        "Planned rolling blackouts during heatwave to prevent grid collapse, requiring coordinated power management.",
      impact: {
        serversAffected: 1100,
        uptimeReduction: 5.5,
        energyConsumption: "+80%",
        estimatedCost: "$650K",
      },
      actionsToken: [
        {
          time: "16:00",
          action: "Advance notification received from utility company",
          status: "completed",
          effectiveness: "high",
        },
        {
          time: "17:30",
          action: "Non-essential systems powered down proactively",
          status: "completed",
          effectiveness: "high",
        },
        {
          time: "18:00",
          action: "Battery systems prepared for extended operation",
          status: "completed",
          effectiveness: "high",
        },
        {
          time: "19:00",
          action: "Coordinated load shedding with other regional facilities",
          status: "completed",
          effectiveness: "medium",
        },
        {
          time: "20:00",
          action: "Customer notifications sent regarding potential service impacts",
          status: "completed",
          effectiveness: "high",
        },
      ],
      outcome: "Achieved 94.5% uptime despite planned outages. Excellent coordination with utility and customers.",
      lessonsLearned: [
        "Advance planning makes significant difference in outcomes",
        "Proactive load shedding reduces impact",
        "Customer communication is crucial for planned events",
      ],
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "destructive"
      case "high":
        return "secondary"
      case "medium":
        return "outline"
      default:
        return "outline"
    }
  }

  const getEventIcon = (eventType: string) => {
    if (eventType.includes("Heatwave")) return <Thermometer className="w-5 h-5 text-red-500" />
    if (eventType.includes("Power") || eventType.includes("Grid")) return <Zap className="w-5 h-5 text-yellow-500" />
    if (eventType.includes("Wildfire") || eventType.includes("Smoke"))
      return <Wind className="w-5 h-5 text-orange-500" />
    if (eventType.includes("Blackout")) return <Activity className="w-5 h-5 text-purple-500" />
    return <AlertTriangle className="w-5 h-5 text-gray-500" />
  }

  const getActionStatusIcon = (status: string, effectiveness: string) => {
    if (status === "completed") {
      if (effectiveness === "high") return <CheckCircle className="w-4 h-4 text-green-500" />
      if (effectiveness === "medium") return <CheckCircle className="w-4 h-4 text-yellow-500" />
      return <CheckCircle className="w-4 h-4 text-gray-500" />
    }
    return <Clock className="w-4 h-4 text-gray-400" />
  }

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incidents.length}</div>
            <p className="text-xs text-muted-foreground">Since 2021</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Uptime</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90.4%</div>
            <p className="text-xs text-muted-foreground">During incidents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost Impact</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5.4M</div>
            <p className="text-xs text-muted-foreground">Estimated losses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recovery Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2h</div>
            <p className="text-xs text-muted-foreground">Average to full recovery</p>
          </CardContent>
        </Card>
      </div>

      {/* Incident Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Historical Climate Incidents & Response Actions</CardTitle>
          <CardDescription>
            Comprehensive record of extreme weather events affecting California data center operations and the
            mitigation strategies deployed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {incidents.map((incident, index) => (
            <div key={incident.id} className="relative">
              {/* Timeline connector */}
              {index < incidents.length - 1 && <div className="absolute left-6 top-16 w-0.5 h-full bg-border" />}

              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center">
                  {getEventIcon(incident.eventType)}
                </div>

                {/* Incident content */}
                <div className="flex-1 space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{incident.eventType}</h3>
                        <Badge variant={getSeverityColor(incident.severity) as any}>{incident.severity}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {incident.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {incident.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {incident.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Thermometer className="w-4 h-4" />
                          {incident.maxTemp}°C
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{incident.id}</Badge>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground">{incident.description}</p>

                  {/* Impact metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-red-600">{incident.impact.serversAffected}</div>
                      <div className="text-xs text-muted-foreground">Servers Affected</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-orange-600">{incident.impact.uptimeReduction}%</div>
                      <div className="text-xs text-muted-foreground">Uptime Reduction</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-blue-600">{incident.impact.energyConsumption}</div>
                      <div className="text-xs text-muted-foreground">Energy Usage</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-purple-600">{incident.impact.estimatedCost}</div>
                      <div className="text-xs text-muted-foreground">Estimated Cost</div>
                    </div>
                  </div>

                  {/* Actions taken */}
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Response Actions Taken
                    </h4>
                    <div className="space-y-2">
                      {incident.actionsToken.map((action, actionIndex) => (
                        <div key={actionIndex} className="flex items-start gap-3 p-3 bg-background border rounded-lg">
                          <div className="flex-shrink-0 mt-0.5">
                            {getActionStatusIcon(action.status, action.effectiveness)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">{action.time}</span>
                              <Badge
                                variant={
                                  action.effectiveness === "high"
                                    ? "default"
                                    : action.effectiveness === "medium"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="text-xs"
                              >
                                {action.effectiveness} effectiveness
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{action.action}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Outcome</h4>
                    <p className="text-sm text-green-700">{incident.outcome}</p>
                  </div>

                  {/* Lessons learned */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Lessons Learned</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      {incident.lessonsLearned.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          {lesson}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {index < incidents.length - 1 && <Separator className="my-8" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights & Improvements</CardTitle>
          <CardDescription>Strategic improvements implemented based on historical incident analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-green-800">Most Effective Actions</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Workload migration to backup facilities</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Emergency cooling protocol activation</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Proactive load reduction strategies</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Backup generator deployment</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-blue-800">Infrastructure Improvements</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span>Enhanced redundant cooling capacity</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span>Improved air filtration systems</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span>Extended battery backup duration</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span>Automated workload migration systems</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
