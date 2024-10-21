import React from "react"
import PageNavbar from "../../components/ui/PageNavbar"
import { message } from "antd"

const Discounts = () => {
  return (
    <div>
      <PageNavbar
        title="Discounts"
        canSearch={true}
        buttonName="Create Discount"
        searchOnChange={function (
          e: React.ChangeEvent<HTMLInputElement>
        ): void {
          message.info("Function is not implemented yet")
        }}
        searchTerm={""}
        onClick={function (): void {
          message.info("Function is not implemented yet")
        }}
      />

      <h1>Discounts info here..</h1>
    </div>
  )
}

export default Discounts
