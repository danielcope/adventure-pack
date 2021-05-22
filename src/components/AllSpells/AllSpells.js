import React from 'react'
import { Link } from 'react-router-dom'
 
const AllSpells = () => {

  return (
    <section className='spell-view'>

      <div className='levels-container'>
        <div>
          <Link to={`/spelllevel/0`}>Level 0</Link>
        </div>
        <div>
          <Link to={`/spelllevel/1`}>Level 1</Link>
        </div>
        <div>
          <Link to={`/spelllevel/2`}>Level 2</Link>
        </div>
        <div>
          <Link to={`/spelllevel/3`}>Level 3</Link>
        </div>
        <div>
          <Link to={`/spelllevel/4`}>Level 4</Link>
        </div>
          <Link to={`/spelllevel/5`}>Level 5</Link>
        <div>
          <Link to={`/spelllevel/6`}>Level 6</Link>
        </div>
          <Link to={`/spelllevel/7`}>Level 7</Link>
        <div>
          <Link to={`/spelllevel/8`}>Level 8</Link>
        </div>

        <div>
        <Link to={`/spelllevel/9`}>Level 9</Link>
        </div>

      </div>

    </section>
)
}

export default AllSpells