import React, { useEffect, useState } from 'react'
import CardList from '../components/CardList'
import ErrorBoundary from '../components/ErrorBoundary'
import Scroll from '../components/Scroll'
import SearchBox from '../components/SearchBox'
import './App.css'

function App() {
  const [searchField, setSearchField] = useState('')

  const [robots, setRobots] = useState([])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setRobots(users))
  }, [])

  const onSearchChange = (event) => {
    setSearchField(event.target.value)
  }

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase())
  })
  return !robots.length ? (
    <h1>Loading</h1>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  )
}

export default App
