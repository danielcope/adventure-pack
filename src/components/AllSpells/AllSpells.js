import React from 'react'
import { Link } from 'react-router-dom'
import AllSpellsNav from './AllSpellsNav'
 
const AllSpells = (props) => {

  return (
    <section>

      <AllSpellsNav />

    <section className='spell-view'>

      <div className='levels-container'>
        <div className='levels-section'>
          <Link className='level-links text' to={`/spelllevel/0`}>Cantrips</Link>
        </div>
        <div className='levels-section'>
          <Link className='level-links text' to={`/spelllevel/1`}>Level 1</Link>
        </div>
        <div className='levels-section'>
          <Link className='level-links text' to={`/spelllevel/2`}>Level 2</Link>
        </div>
        <div className='levels-section'>
          <Link className='level-links text' to={`/spelllevel/3`}>Level 3</Link>
        </div>
        <div className='levels-section'>
          <Link to={`/spelllevel/4`} className='level-links text'>Level 4</Link>
        </div>
        <div className='levels-section'>
          <Link to={`/spelllevel/5`} className='level-links text'>Level 5</Link>
        </div>
        <div className='levels-section'>
          <Link className='level-links text' to={`/spelllevel/6`}>Level 6</Link>
        </div>
        <div className='levels-section'>
          <Link to={`/spelllevel/7`} className='level-links text'>Level 7</Link>
        </div>
        <div className='levels-section'>
          <Link to={`/spelllevel/8`} className='level-links text'>Level 8</Link>
        </div>

        <div className='levels-section'>
          <Link className='level-links text' to={`/spelllevel/9`}>Level 9</Link>
        </div>

      </div>

    </section>
    </section>
)
}

export default AllSpells