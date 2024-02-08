/* eslint-disable no-unused-vars */
import supabase from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins")
    .select("*")
    .range(0, 9);

  if (error) {
    console.error(error);
    throw new Error("cabins could not be found");
  }

  return cabins;
}




export async function deleteCabin(id) {
  
const {data, error } = await supabase
.from('cabins')
.delete()
.eq('id', id)

if (error) {
  console.error(error);
  throw new Error("cabins could not be deleted");
}
return data
}
