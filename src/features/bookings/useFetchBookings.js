/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useFetchBookings() {
  const queryClient = useQueryClient();

  // Creating a Filter Functionality on the Server
  const [searchParams] = useSearchParams();

  // FILTER
  // This gotten from the Url described First in the Sort Ui Component
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  
  // Here the Filter Method is dynamic pass to the Api QueryHook
  // { field: "totalPrice", value: 5000, method: "gte" };


  // SORTBY
  // This gotten from the Url described First in the Sort Ui Component
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  // wrangling and all here 🧺
  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

 // PAGINATION
 const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

   // QUERY 
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // The dependency array queue
    queryKey: [
      "bookings",
      filter,
      sortBy,
      page
    ],

    // Real Idan GANGAN 🔫
    queryFn: () =>
      getBookings({
        filter,
        sortBy,
        page
      }),
  });
  return { isLoading, bookings, error ,count};
}
