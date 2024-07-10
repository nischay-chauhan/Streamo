import { columns, Payment } from "./_components/columns"
import { DataTable } from "./_components/data-table"


async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

const CommunityPage = async() => {
    const data = await getData();
    return(
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">
                </h1>
            </div>
      <DataTable columns={columns} data={data} />
        </div>
    )
}

export default CommunityPage