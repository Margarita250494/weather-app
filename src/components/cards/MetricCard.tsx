const MetricCard = ({ title, weather, unit }: { title: string; weather: number; unit: string }) => {
  return (
    <div className="min-h-29.25 metric-card flex flex-col gap-6 ">
      <h6 className="body-small text-neutral-300">{title}</h6>
      <span className="metric-value">
        {weather}
        {unit}
      </span>
    </div>
  )
}
export default MetricCard
