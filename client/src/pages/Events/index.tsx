import { useTestQuery } from "../../redux/slices/testSlice"

const Events = () => {
  const { data, isLoading, error } = useTestQuery()
  console.log(data)
  return (
    <div>
      <h1>Data:</h1>
      <h1>{data.message}</h1>
    </div>
  )
}

export default Events
