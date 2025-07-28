"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Html, Text, Box, Cylinder, Sphere } from "@react-three/drei"
import { useState, useRef, useMemo } from "react"
import type { Mesh } from "three"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"

interface SimulationState {
  operationMode: "grid-connected" | "islanded"
  renewablePenetration: number
  batteryCapacity: number
  backupGenerators: boolean
  loadShifting: boolean
  climateEvent: "none" | "heatwave" | "storm" | "flood" | "wildfire"
  gridStability: number
}

interface Facility3DProps {
  simulation: SimulationState
}

interface EquipmentStatus {
  id: string
  name: string
  status: "operational" | "warning" | "critical" | "offline"
  temperature?: number
  load?: number
  efficiency?: number
}

// Server Rack Component
function ServerRack({
  position,
  status,
  onClick,
  rackId,
}: {
  position: [number, number, number]
  status: EquipmentStatus
  onClick: (equipment: EquipmentStatus) => void
  rackId: string
}) {
  const meshRef = useRef<Mesh>(null)

  const getColor = () => {
    switch (status.status) {
      case "operational":
        return "#22c55e"
      case "warning":
        return "#f59e0b"
      case "critical":
        return "#ef4444"
      case "offline":
        return "#6b7280"
      default:
        return "#22c55e"
    }
  }

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[1, 2, 0.6]}
        onClick={() => onClick(status)}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <meshStandardMaterial color={getColor()} />
      </Box>

      {/* Status indicator lights */}
      <Sphere args={[0.05]} position={[0.4, 0.8, 0.31]}>
        <meshBasicMaterial color={getColor()} />
      </Sphere>

      {/* Rack label */}
      <Html position={[0, -1.2, 0]} center>
        <div className="text-xs font-mono text-white bg-black bg-opacity-50 px-1 rounded">{rackId}</div>
      </Html>
    </group>
  )
}

// Cooling Unit Component
function CoolingUnit({
  position,
  status,
  onClick,
}: {
  position: [number, number, number]
  status: EquipmentStatus
  onClick: (equipment: EquipmentStatus) => void
}) {
  const getColor = () => {
    switch (status.status) {
      case "operational":
        return "#3b82f6"
      case "warning":
        return "#f59e0b"
      case "critical":
        return "#ef4444"
      case "offline":
        return "#6b7280"
      default:
        return "#3b82f6"
    }
  }

  return (
    <group position={position}>
      <Cylinder
        args={[0.8, 0.8, 1.5]}
        onClick={() => onClick(status)}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <meshStandardMaterial color={getColor()} />
      </Cylinder>

      {/* Fan blades */}
      <Cylinder args={[0.6, 0.6, 0.1]} position={[0, 0.8, 0]}>
        <meshStandardMaterial color="#ffffff" opacity={0.7} transparent />
      </Cylinder>

      {/* Temperature indicator */}
      <Html position={[0, -1, 0]} center>
        <div className="text-xs font-mono text-white bg-black bg-opacity-50 px-1 rounded">{status.temperature}°C</div>
      </Html>
    </group>
  )
}

// Power Distribution Unit
function PowerUnit({
  position,
  status,
  onClick,
}: {
  position: [number, number, number]
  status: EquipmentStatus
  onClick: (equipment: EquipmentStatus) => void
}) {
  const getColor = () => {
    switch (status.status) {
      case "operational":
        return "#8b5cf6"
      case "warning":
        return "#f59e0b"
      case "critical":
        return "#ef4444"
      case "offline":
        return "#6b7280"
      default:
        return "#8b5cf6"
    }
  }

  return (
    <group position={position}>
      <Box
        args={[1.5, 2.5, 1]}
        onClick={() => onClick(status)}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <meshStandardMaterial color={getColor()} />
      </Box>

      {/* Power indicators */}
      {[0, 1, 2].map((i) => (
        <Sphere key={i} args={[0.08]} position={[-0.5 + i * 0.5, 1, 0.51]}>
          <meshBasicMaterial color={status.status === "operational" ? "#22c55e" : "#ef4444"} />
        </Sphere>
      ))}

      <Html position={[0, -1.5, 0]} center>
        <div className="text-xs font-mono text-white bg-black bg-opacity-50 px-1 rounded">{status.load}% Load</div>
      </Html>
    </group>
  )
}

// Battery Storage Unit
function BatteryUnit({
  position,
  status,
  onClick,
  charge,
}: {
  position: [number, number, number]
  status: EquipmentStatus
  onClick: (equipment: EquipmentStatus) => void
  charge: number
}) {
  const getColor = () => {
    if (charge > 60) return "#22c55e"
    if (charge > 30) return "#f59e0b"
    return "#ef4444"
  }

  return (
    <group position={position}>
      <Box
        args={[2, 1, 1.5]}
        onClick={() => onClick(status)}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <meshStandardMaterial color={getColor()} />
      </Box>

      {/* Battery level indicator */}
      <Box args={[1.8 * (charge / 100), 0.2, 0.2]} position={[0, 0.6, 0.76]}>
        <meshBasicMaterial color="#ffffff" />
      </Box>

      <Html position={[0, -0.8, 0]} center>
        <div className="text-xs font-mono text-white bg-black bg-opacity-50 px-1 rounded">{charge}% Charge</div>
      </Html>
    </group>
  )
}

// Equipment Info Panel
function EquipmentInfo({
  equipment,
  onClose,
}: {
  equipment: EquipmentStatus | null
  onClose: () => void
}) {
  if (!equipment) return null

  const getStatusIcon = () => {
    switch (equipment.status) {
      case "operational":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "critical":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "offline":
        return <XCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = () => {
    switch (equipment.status) {
      case "operational":
        return "default"
      case "warning":
        return "secondary"
      case "critical":
        return "destructive"
      case "offline":
        return "outline"
    }
  }

  return (
    <div className="absolute top-4 right-4 z-10">
      <Card className="w-80">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              {getStatusIcon()}
              {equipment.name}
            </CardTitle>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ×
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Status:</span>
            <Badge variant={getStatusColor() as any}>{equipment.status.toUpperCase()}</Badge>
          </div>

          {equipment.temperature && (
            <div className="flex items-center justify-between">
              <span>Temperature:</span>
              <span className="font-mono">{equipment.temperature}°C</span>
            </div>
          )}

          {equipment.load && (
            <div className="flex items-center justify-between">
              <span>Load:</span>
              <span className="font-mono">{equipment.load}%</span>
            </div>
          )}

          {equipment.efficiency && (
            <div className="flex items-center justify-between">
              <span>Efficiency:</span>
              <span className="font-mono">{equipment.efficiency}%</span>
            </div>
          )}

          <div className="text-xs text-gray-600 mt-2">Click on other equipment to view their status</div>
        </CardContent>
      </Card>
    </div>
  )
}

export function Facility3D({ simulation }: Facility3DProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentStatus | null>(null)

  // Generate equipment status based on simulation state
  const equipmentData = useMemo(() => {
    const getServerStatus = (id: string): EquipmentStatus => {
      let status: "operational" | "warning" | "critical" | "offline" = "operational"
      let temperature = 24
      let load = 75

      if (simulation.climateEvent === "heatwave") {
        temperature = 42
        if (id === "R01" || id === "R02") status = "warning"
      } else if (simulation.climateEvent === "flood") {
        if (id === "R01" || id === "R02" || id === "R03") status = "critical"
      } else if (simulation.climateEvent === "storm") {
        load = 45
        if (id === "R04") status = "warning"
      }

      return {
        id,
        name: `Server Rack ${id}`,
        status,
        temperature,
        load,
        efficiency: status === "operational" ? 92 : status === "warning" ? 78 : 45,
      }
    }

    const getCoolingStatus = (id: string): EquipmentStatus => {
      let status: "operational" | "warning" | "critical" | "offline" = "operational"
      let temperature = 18
      let load = 60

      if (simulation.climateEvent === "heatwave") {
        temperature = 28
        load = 95
        if (id === "AC01") status = "critical"
      }

      return {
        id,
        name: `Cooling Unit ${id}`,
        status,
        temperature,
        load,
        efficiency: status === "operational" ? 88 : 65,
      }
    }

    const getPowerStatus = (id: string): EquipmentStatus => {
      let status: "operational" | "warning" | "critical" | "offline" = "operational"
      let load = 70

      if (simulation.operationMode === "islanded" && id === "PDU01") {
        status = "offline"
        load = 0
      } else if (simulation.climateEvent === "storm") {
        load = 85
        status = "warning"
      }

      return {
        id,
        name: `Power Distribution Unit ${id}`,
        status,
        load,
        efficiency: status === "operational" ? 94 : status === "warning" ? 82 : 0,
      }
    }

    return {
      servers: ["R01", "R02", "R03", "R04", "R05", "R06"].map(getServerStatus),
      cooling: ["AC01", "AC02", "AC03", "AC04"].map(getCoolingStatus),
      power: ["PDU01", "PDU02", "PDU03"].map(getPowerStatus),
      battery: {
        id: "BAT01",
        name: "Battery Storage System",
        status: simulation.batteryCapacity > 30 ? "operational" : ("warning" as any),
        efficiency: 91,
      },
    }
  }, [simulation])

  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [15, 10, 15], fov: 60 }} style={{ background: "#0f0f23" }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />

        {/* Environment */}
        <Environment preset="warehouse" />

        {/* Floor */}
        <Box args={[30, 0.2, 20]} position={[0, -0.1, 0]}>
          <meshStandardMaterial color="#2a2a2a" />
        </Box>

        {/* Server Racks - arranged in rows */}
        {equipmentData.servers.map((server, index) => (
          <ServerRack
            key={server.id}
            position={[-8 + (index % 3) * 4, 1, -6 + Math.floor(index / 3) * 6]}
            status={server}
            onClick={setSelectedEquipment}
            rackId={server.id}
          />
        ))}

        {/* Cooling Units - positioned around the perimeter */}
        {equipmentData.cooling.map((cooling, index) => (
          <CoolingUnit
            key={cooling.id}
            position={[index < 2 ? -12 : 12, 0.75, -8 + (index % 2) * 16]}
            status={cooling}
            onClick={setSelectedEquipment}
          />
        ))}

        {/* Power Distribution Units */}
        {equipmentData.power.map((power, index) => (
          <PowerUnit
            key={power.id}
            position={[-10 + index * 10, 1.25, 8]}
            status={power}
            onClick={setSelectedEquipment}
          />
        ))}

        {/* Battery Storage */}
        <BatteryUnit
          position={[8, 0.5, -8]}
          status={equipmentData.battery}
          onClick={setSelectedEquipment}
          charge={simulation.batteryCapacity}
        />

        {/* Facility Labels */}
        <Text position={[0, 5, -12]} fontSize={1} color="white" anchorX="center" anchorY="middle">
          Climate-Aware Data Center
        </Text>

        {/* Climate Event Effects */}
        {simulation.climateEvent === "flood" && (
          <Box args={[30, 0.5, 20]} position={[0, 0.25, 0]}>
            <meshStandardMaterial color="#1e40af" opacity={0.3} transparent />
          </Box>
        )}

        {simulation.climateEvent === "wildfire" && (
          <>
            <Sphere args={[20]} position={[0, 0, 0]}>
              <meshBasicMaterial color="#dc2626" opacity={0.1} transparent />
            </Sphere>
          </>
        )}

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Equipment Info Panel */}
      <EquipmentInfo equipment={selectedEquipment} onClose={() => setSelectedEquipment(null)} />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white p-3 rounded-lg">
        <div className="text-sm font-semibold mb-2">Equipment Status</div>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Operational</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded"></div>
            <span>Offline</span>
          </div>
        </div>
      </div>

      {/* Controls Help */}
      <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg">
        <div className="text-sm font-semibold mb-2">Controls</div>
        <div className="space-y-1 text-xs">
          <div>Left Click + Drag: Rotate</div>
          <div>Right Click + Drag: Pan</div>
          <div>Scroll: Zoom</div>
          <div>Click Equipment: View Details</div>
        </div>
      </div>
    </div>
  )
}
