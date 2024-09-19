import React from "react"
import { useHospitalSelected } from "@/utils/hooks/useHospitalSelected"
import { Hospital } from "@/utils/data/hospitals/hospitalsTypes"
import {
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	Line,
} from "recharts"
import { useBreakpoint } from "@/utils/hooks/useBP"

export const DepartmentsLines = () => {
	const breakpoint = useBreakpoint()
	const isMobile = breakpoint === "mobile"
	const { hospital } = useHospitalSelected()

	return (
		<div className="flex-1 h-fit w-full md:w-fit bg-white rounded-2xl p-3 md:p-6">
			<h4 className="font-bold text-center md:text-left mt-2">
				Patients par département
			</h4>
			<div className="w-full h-[1px] bg-slate-200 mt-2 mb-4"></div>

			<div className="flex flex-wrap justify-around">
				{hospital.map((el: Hospital) => {
					return (
						<div key={el.name}>
							<p className="mb-0 md:mb-1">{el.name}</p>

							<LineChart
								width={isMobile ? 320 : 575}
								height={isMobile ? 350 : 300}
								data={el.hospitalDepartments}
								margin={{
									top: isMobile ? 15 : 12,
									right: isMobile ? 20 : 12,
									left: isMobile ? 20 : 12,
									bottom: isMobile ? 35 : 12,
								}}>
								<CartesianGrid stroke="#f5f5f5" />

								<XAxis
									dataKey="department"
									padding={{ left: 20, right: 20 }}
									stroke="#2100AD"
									className="text-sm"
								/>
								{!isMobile && <YAxis stroke="#2100AD" />}

								<Tooltip />
								<Legend
									width={300}
									wrapperStyle={{
										bottom: isMobile ? 40 : 10,
										right: isMobile ? 0 : 90,
										lineHeight: "50px",
									}}
								/>

								<Line
									type="monotone"
									dataKey="patientsPerDay"
									stroke="#009dff"
									activeDot={{ r: 4 }}
								/>
								<Line
									type="monotone"
									dataKey="averageWaitTime"
									stroke="#EF62FF"
								/>
							</LineChart>
						</div>
					)
				})}
			</div>
		</div>
	)
}
