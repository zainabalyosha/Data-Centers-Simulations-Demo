"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Zap,
  Thermometer,
  Wifi,
  Server,
  Shield,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react"

interface OutageEvent {
  id: string
  title: string
  date: string
  duration: string
  severity: "critical" | "high" | "medium" | "low"
  type: "power" | "cooling" | "network" | "hardware" | "security"
  description: string
  impact: string
  actionsTaken: string[]
  recommendedPlans: string[]
  lessonsLearned: string[]
  preventiveMeasures: string[]
}

const outageEvents: OutageEvent[] = [
  {
    id: "1",
    title: "Primary Cooling System Failure",
    date: "2024-01-15",
    duration: "4h 23m",
    severity: "critical",
    type: "cooling",
    description:
      "Main HVAC system experienced compressor failure during peak summer temperatures, causing server room temperature to rise to 35°C.",
    impact:
      "15% of servers automatically shut down due to thermal protection. Customer services affected for 4+ hours.",
    actionsTaken: [
      "Activated emergency portable cooling units within 45 minutes",
      "Implemented load balancing to redistribute traffic to unaffected servers",
      "Contacted HVAC vendor for emergency repair service",
      "Manually monitored server temperatures every 15 minutes",
      "Communicated status updates to affected customers every hour",
    ],
    recommendedPlans: [
      "Install redundant cooling systems with automatic failover",
      "Implement temperature monitoring with automated alerts at 28°C threshold",
      "Maintain on-site inventory of portable cooling units",
      "Establish 24/7 HVAC maintenance contract with guaranteed 2-hour response time",
      "Create automated customer notification system for service disruptions",
    ],
    lessonsLearned: [
      "Single point of failure in cooling system created unnecessary risk",
      "Manual temperature monitoring was inefficient and delayed response",
      "Customer communication could have been more proactive",
    ],
    preventiveMeasures: [
      "Monthly HVAC system inspections and maintenance",
      "Install IoT temperature sensors throughout facility",
      "Quarterly disaster recovery drills for cooling failures",
    ],
  },
  {
    id: "2",
    title: "Network Infrastructure Outage",
    date: "2024-02-28",
    duration: "2h 15m",
    severity: "high",
    type: "network",
    description:
      "Fiber optic cable cut by construction work caused complete loss of internet connectivity to the facility.",
    impact: "100% of hosted services inaccessible. Approximately 500 customers affected.",
    actionsTaken: [
      "Immediately contacted ISP to report the outage",
      "Activated backup satellite internet connection",
      "Rerouted critical services through secondary data center",
      "Deployed mobile hotspots for essential operations",
      "Coordinated with construction company to expedite repairs",
    ],
    recommendedPlans: [
      "Implement diverse fiber routes from multiple ISPs",
      "Install automatic failover to backup internet connections",
      "Establish SLA with ISPs for maximum 1-hour repair time",
      "Create network redundancy with mesh topology",
      "Implement real-time network monitoring with instant alerts",
    ],
    lessonsLearned: [
      "Single fiber route created vulnerability to external factors",
      "Backup internet connection had insufficient bandwidth",
      "Need better coordination with local construction activities",
    ],
    preventiveMeasures: [
      "Subscribe to construction activity notifications in the area",
      "Upgrade backup internet to match primary capacity",
      "Install underground cable protection systems",
    ],
  },
  {
    id: "3",
    title: "Power Grid Failure",
    date: "2024-03-10",
    duration: "6h 45m",
    severity: "critical",
    type: "power",
    description:
      "Regional power grid failure during storm caused extended outage. Backup generators ran for 6+ hours before fuel depletion.",
    impact: "Complete facility shutdown. All services offline. Emergency protocols activated.",
    actionsTaken: [
      "Backup generators activated automatically within 30 seconds",
      "Emergency fuel delivery arranged within 4 hours",
      "Non-critical systems powered down to conserve fuel",
      "Staff worked in shifts to monitor generator status",
      "Coordinated with utility company for restoration timeline",
    ],
    recommendedPlans: [
      "Install larger fuel storage capacity for 48+ hour operation",
      "Establish contracts with multiple fuel suppliers",
      "Implement UPS systems for seamless power transitions",
      "Create tiered power management system for extended outages",
      "Install solar panels with battery storage as tertiary backup",
    ],
    lessonsLearned: [
      "Fuel storage was insufficient for extended outages",
      "Need better communication with utility companies",
      "Manual generator monitoring was resource-intensive",
    ],
    preventiveMeasures: [
      "Weekly generator testing and maintenance",
      "Automated fuel level monitoring with low-level alerts",
      "Quarterly emergency power drills",
    ],
  },
  {
    id: "4",
    title: "Climate Control System Malfunction",
    date: "2024-04-22",
    duration: "3h 12m",
    severity: "high",
    type: "cooling",
    description:
      "Humidity control system failed during high ambient humidity conditions, causing condensation in server racks.",
    impact: "2 server racks experienced water damage. 8% of services temporarily offline.",
    actionsTaken: [
      "Immediately shut down affected server racks",
      "Deployed industrial dehumidifiers",
      "Moved critical services to backup hardware",
      "Conducted thorough equipment inspection for water damage",
      "Implemented temporary humidity monitoring stations",
    ],
    recommendedPlans: [
      "Install redundant humidity control systems",
      "Implement water detection sensors in all server racks",
      "Create automated shutdown procedures for water detection",
      "Establish rapid equipment replacement protocols",
      "Install raised flooring with proper drainage systems",
    ],
    lessonsLearned: [
      "Humidity monitoring was insufficient for early detection",
      "Water damage response procedures needed improvement",
      "Equipment replacement took longer than acceptable",
    ],
    preventiveMeasures: [
      "Install comprehensive environmental monitoring system",
      "Maintain inventory of critical spare equipment",
      "Conduct monthly water damage response drills",
    ],
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "bg-red-500"
    case "high":
      return "bg-orange-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "power":
      return <Zap className="h-4 w-4" />
    case "cooling":
      return <Thermometer className="h-4 w-4" />
    case "network":
      return <Wifi className="h-4 w-4" />
    case "hardware":
      return <Server className="h-4 w-4" />
    case "security":
      return <Shield className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
  }
}

export default function OutageEventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<OutageEvent>(outageEvents[0])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Outage Event Analysis</h2>
          <p className="text-muted-foreground">
            Historical incidents, response actions, and improvement recommendations
          </p>
        </div>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outageEvents.length}</div>
            <p className="text-xs text-muted-foreground">Last 12 months</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3h 52m</div>
            <p className="text-xs text-muted-foreground">-15% from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers Affected</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">Across all incidents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Climate Related</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50%</div>
            <p className="text-xs text-muted-foreground">Of total incidents</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Recent Incidents</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="space-y-2 p-4">
                {outageEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedEvent.id === event.id ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(event.type)}
                      <Badge variant="outline" className={`${getSeverityColor(event.severity)} text-white`}>
                        {event.severity}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm mb-1">{event.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {event.duration}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-2">
              {getTypeIcon(selectedEvent.type)}
              <CardTitle>{selectedEvent.title}</CardTitle>
              <Badge variant="outline" className={`${getSeverityColor(selectedEvent.severity)} text-white`}>
                {selectedEvent.severity}
              </Badge>
            </div>
            <CardDescription>
              {selectedEvent.date} • Duration: {selectedEvent.duration}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="actions">Actions Taken</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="lessons">Lessons Learned</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    Impact Assessment
                  </h4>
                  <p className="text-sm text-muted-foreground">{selectedEvent.impact}</p>
                </div>
              </TabsContent>

              <TabsContent value="actions" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Actions Taken During Incident
                  </h4>
                  <ul className="space-y-2">
                    {selectedEvent.actionsTaken.map((action, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    Recommended Response Plans
                  </h4>
                  <ul className="space-y-2">
                    {selectedEvent.recommendedPlans.map((plan, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        {plan}
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-500" />
                    Preventive Measures
                  </h4>
                  <ul className="space-y-2">
                    {selectedEvent.preventiveMeasures.map((measure, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Shield className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        {measure}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="lessons" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-orange-500" />
                    Key Lessons Learned
                  </h4>
                  <ul className="space-y-2">
                    {selectedEvent.lessonsLearned.map((lesson, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <FileText className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
