import { SetStateAction, useEffect, useState } from "react"
import mockData from "./mock-data.json"
import { Address, InfoBlock } from "./components/InfoBlock"
import { Button } from "./components/Button"
import { ImageBlock } from "./components/ImageBlock"
import { Input } from "./components/Input"
import { Pagination } from "./components/Pagination"
import { RentUnit } from "./enums"
import "./Listings.scss"

export interface UnitTable {
  minIncomeMaximum: number
  minIncomeMinimum: number
  rentMaximum: number
  rentMinimum: number
  rentUnit: RentUnit
  type: "studio" | "oneBdrm" | "twoBdrm" | "threeBdrm" | "fourBdrm"
}

export interface Listing {
  address: Address
  deadline: string
  id: string
  imageLabels: string[]
  imageURL: string
  listingLabels: string[]
  name: string
  tableHeader: string | null
  tableSubheader: string | null
  unitTableData: UnitTable[]
}

const allData: Listing[] = mockData.sort((a, b) =>
  a.name < b.name ? -1 : a.name > b.name ? 1 : 0
) as Listing[]

export const Listings = () => {
  const [error, setError] = useState<string | null>(null)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [itemsPerPageInput, setItemsPerPageInput] = useState(3)
  const [page, setPage] = useState(1)
  const [listingData, setListingData] = useState<Listing[]>(allData)
  const [items, setItems] = useState<Listing[]>([])
  const [unitTypeFilter, setUnitTypeFilter] = useState("")

  const numSteps = Math.ceil(listingData.length / itemsPerPage)

  const unitTypeOptions = [
    { value: "studio", label: "Studio" },
    { value: "oneBdrm", label: "1 BR" },
    { value: "twoBdrm", label: "2 BR" },
    { value: "threeBdrm", label: "3 BR" },
    { value: "fourBdrm", label: "4 BR" },
  ]

  function onUnitTypeChange(e: { target: { value: SetStateAction<string> } }) {
    setUnitTypeFilter(e.target.value)
  }

  useEffect(() => {
    if (!unitTypeFilter) {
      setListingData(allData)
    } else {
      setListingData(
        allData.filter((listing) =>
          listing.unitTableData.some((unit) => unit.type === unitTypeFilter)
        )
      )
    }
  }, [listingData, unitTypeFilter])

  useEffect(() => {
    setItems(
      listingData.slice((page - 1) * itemsPerPage, page * itemsPerPage + 1)
    )
  }, [itemsPerPage, listingData, page])

  return (
    <div className={"content"}>
      <div className={"container"}>
        <div className={"filter-container"}>
          <div className={"filters"}>
            <div className={"update-items"}>
              <Input
                label={"Items per page"}
                setValue={setItemsPerPageInput}
                value={itemsPerPageInput}
                setErrorMessage={setError}
              />
              <Button
                onClick={() => {
                  if (!itemsPerPageInput || itemsPerPageInput < 1) {
                    setError("Must be greater than 0")
                  } else {
                    setItemsPerPage(itemsPerPageInput)
                  }
                }}
              >
                Update
              </Button>
            </div>
            {error && <div className={"error-message"}>{error}</div>}
          </div>
          <Pagination
            numSteps={numSteps}
            selected={page}
            setSelected={setPage}
          />
        </div>
        <div className={"listings"}>
          {items.map((listing, index) => {
            return (
              <div className="listing" key={index}>
                <ImageBlock
                  imageURL={listing.imageURL}
                  deadline={listing.deadline}
                  labels={listing.imageLabels}
                />
                <InfoBlock
                  title={`${index + 1 + (page - 1) * itemsPerPage}. ${
                    listing.name
                  }`}
                  address={listing.address}
                  tableHeader={listing.tableHeader}
                  tableSubheader={listing.tableSubheader}
                  labels={listing.listingLabels}
                  unitRows={listing.unitTableData}
                />
              </div>
            )
          })}
        </div>
        <hr />
          <div>
            <ol>
              <li>
                When the application loads, the user should be on page 1, and
                the default number of items per page should be 2.
              </li>
              <li>
                A user should be able to change the number of items per page.
                The update takes place when a user clicks an "Update" button.
              </li>
              <li>
                Only numbers greater than 0 are valid in the input for number of
                items per page. An error message should display if the input is
                not valid.
              </li>
              <li>
                A user should be able to navigate through the pages by clicking
                either a number representing the page, or an arrow in either
                direction.
              </li>
              <li>
                When a user updates the number of items per page, the selected
                page should reset to page 1.
              </li>
            </ol>
          </div>
      </div>
    </div>
  )
}
