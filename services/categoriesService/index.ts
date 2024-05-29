export const getCategoriesList = async () => {
  try {
    const data = await fetch("/categories/api", {
      cache: "no-store",
    })
    const result = await data.json()
    return result
  } catch (error) {
    console.error(error)
  }
}
