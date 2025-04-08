import React from "react"
import { Label } from "./Label"
import { UnitRow, UnitTable } from "./UnitTable"
import "./InfoBlock.scss"

export type Address = {
  street: string
  city: string
  state: string
  zipCode: string
}

export interface InfoBlockProps {
  address: Address
  labels: string[]
  tableHeader: string | null
  tableSubheader: string | null
  title: string
  unitRows: UnitRow[]
}

export const InfoBlock = (props: InfoBlockProps) => {
  const getAddress = (address: Address) => {
    return `${address.street}, ${address.city} ${address.state} ${address.zipCode}`
  }

  return (
    <div className="info-block">
      <div className={"title"}>{props.title}</div>
      <div className={"address"}>{getAddress(props.address)}</div>
      {props.labels.length > 0 && (
        <div className={"label-container"}>
          {props.labels.map((label, index) => {
            return <Label text={label} styleType={"listing"} key={index} />
          })}
        </div>
      )}
      <hr />
      <UnitTable unitRows={props.unitRows} />
    </div>
  )
}
