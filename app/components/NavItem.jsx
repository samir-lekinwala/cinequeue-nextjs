import Link from 'next/link'
import React from 'react'

function NavItem({ item }) {
  return (
    <li className="" key={item.listItem}>
      <Link href={item.link}>{item.listItem}</Link>
    </li>
  )
}

export default NavItem
