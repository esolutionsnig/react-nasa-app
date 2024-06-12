import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import  Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {
  const [data, setData] = useState(null)
  const [loadinng, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  
  function handleToggleModal() {
    setShowModal(!showModal)
  }

  useEffect(() => { 
    async function fetchApiData() {
      const key = "8wkv2PAv5Af5tuY8Crdu9kIrE6ldpIi1iXii9i9D"
      const url = 'https://api.nasa.gov/planetary/apod' + `?api_key=${key}`
      setLoading(true)

        const today = (new Date()).toDateString()
        const localKey = `NASA-${today}`
        if (localStorage.getItem(localKey)) {
          const apiData = JSON.parse(localStorage.getItem(localKey))
          setData(apiData)
        }
      
      localStorage.clear() // clear all

      try {
        const res = await fetch(url)
        const apiData = await res.json()
        localStorage.setItem(localKey, JSON.stringify(apiData))

        setData(apiData)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    fetchApiData()
  }, [])

  return (
    <>
      {data ? (<Main data={data} />) : (
        <div className="loadingState"><i className="fa-solid fa-gear"></i></div>
      )}
      {showModal && (<SideBar data={data} handleToggleModal={handleToggleModal} />)}
      {data && (<Footer data={data} handleToggleModal={handleToggleModal} />)}
    </>
  )
}

export default App
