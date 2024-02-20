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
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  
  // Here the Filter Method is dynamic pass to the Api QueryHook
  // { field: "totalPrice", value: 5000, method: "gte" };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () =>
      getBookings({
        filter,
      }),
  });
  return { isLoading, bookings, error };
}
