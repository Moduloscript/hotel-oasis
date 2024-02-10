/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

//FETCHING OR QUERYING CABIN DATA
export async function getCabins() {
  const { data: cabins, error } = await supabase
    .from("cabins")
    .select("*")
    .range(0, 9);

  if (error) {
    console.error(error);
    throw new Error("cabins could not be found");
  }

  return cabins;
}

export async function createCabin(newCabin) {
  // create a Randomize image name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  // Assign a Image path on Supabase Storage
  const imagePath =`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
  // https://vyyhwtryxhdnjoyhhrbq.supabase.co/storage/v1/object/public/cabin-images/cabin-004.jpg

  // Create the Cabin 🏠🏡 registry
  const { data, error } = await supabase
    .from("cabins")
    .insert([{...newCabin, image: imagePath}])
    .select();
  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }

  // Upload image
  const {  error: storageError } = await supabase.storage
  .from('cabin-images')
    .upload(imageName, newCabin.image)
  
  // Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("cabin image could not be uploaded and cabin not created");
}
  return data;
}

// DELETING CABIN DATA
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }
  return data;
}
