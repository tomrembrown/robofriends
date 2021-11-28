import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestRobots, setSearchField } from '../actions'
import CardList from '../components/CardList'
import ErrorBoundary from '../components/ErrorBoundary'
import Scroll from '../components/Scroll'
import SearchBox from '../components/SearchBox'
import './App.css'

// const mapStateToProps = (state) => {
//   return {
//     searchField: state.searchRobots.searchField,
//     robots: state.requestRobots.robots,
//     isPending: state.requestRobots.isPending,
//     error: state.requestRobots.error,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
//     onRequestRobots: () => requestRobots(dispatch),
//   }
// }

function App() {
  const { searchField, isPending, robots, error } = useSelector((state) => ({
    searchField: state.searchRobots.searchField,
    isPending: state.requestRobots.isPending,
    robots: state.requestRobots.robots,
    error: state.requestRobots.error,
  }))

  const dispatch = useDispatch()

  const onSearchChange = (event) => dispatch(setSearchField(event.target.value))

  useEffect(() => {
    dispatch(requestRobots())
    // eslint-disable-next-line
  }, [])

  const filteredRobots = robots.filter((robot) => {
    return robot.name.toLowerCase().includes(searchField.toLowerCase())
  })
  return isPending ? (
    <h1>Loading</h1>
  ) : error.length !== 0 ? (
    <div className="tc">
      <h1>Error</h1>
      <h2> {error} </h2>
    </div>
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
