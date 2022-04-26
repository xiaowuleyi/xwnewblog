import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGlobal } from '@/lib/global'
import CONFIG_APPLE_IOS_HEXO from '../config_apple_ios_hexo'
import dynamic from 'next/dynamic'
const ChiConv = dynamic(() => import('@/components/ChiConv'), {
  ssr: false
})

const MenuList = props => {
  const { postCount, customNav } = props
  const { locale } = useGlobal()
  const router = useRouter()
  const archiveSlot = (
    <div className="bg-gray-300 dark:bg-gray-500 rounded-md text-gray-50 px-1 text-xs">
      {postCount}
    </div>
  )

  let links = [
    { icon: 'fas fa-home', name: locale.NAV.INDEX, to: '/' || '/', show: true },
    {
      icon: 'fas fa-th',
      name: locale.COMMON.CATEGORY,
      to: '/category',
      show: CONFIG_APPLE_IOS_HEXO.MENU_CATEGORY
    },
    {
      icon: 'fas fa-tag',
      name: locale.COMMON.TAGS,
      to: '/tag',
      show: CONFIG_APPLE_IOS_HEXO.MENU_TAG
    },
    {
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      to: '/archive',
      slot: archiveSlot,
      show: CONFIG_APPLE_IOS_HEXO.MENU_ARCHIVE
    },
    {
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      to: '/search',
      show: CONFIG_APPLE_IOS_HEXO.MENU_SEARCH
    }
  ]
  if (customNav) {
    links = links.concat(customNav)
  }

  return (
    <nav
      id="nav"
      className="leading-8 text-gray-500 dark:text-gray-400 font-sans"
    >
      {links.map(link => {
        if (link && link.show) {
          const selected =
            router.pathname === link.to || router.asPath === link.to
          return (
            <Link key={`${link.to}`} title={link.to} href={link.to}>
              <a
                className={
                  'py-1.5 px-5 text-base justify-between hover:bg-blue-400 hover:text-white hover:shadow-lg cursor-pointer font-light flex flex-nowrap items-center ' +
                  (selected ? 'bg-gray-200 text-black' : ' ')
                }
              >
                <div className="my-auto items-center justify-center flex ">
                  <i className={`${link.icon} w-4 text-center`} />
                  <div className={'ml-4'}>{link.name}</div>
                </div>
                {link.slot}
              </a>
            </Link>
          )
        } else {
          return null
        }
      })}
      <ChiConv inList length="4" />
      {/* <a
        className={
          'py-1.5 px-5 text-base justify-between hover:bg-blue-400 hover:text-white hover:shadow-lg cursor-pointer font-light flex flex-nowrap items-center '
        }
      >
        <div className="my-auto items-center justify-center flex ">
          <i className={`fa fa-language w-4 text-center`} />
          {/* <div className={'ml-4'}>{link.name}</div> */}
      {/* <div className={'ml-4'}>
            <ChiConv inList length="4" />
          </div>
        </div> */}
      {/* </a> */}
    </nav>
  )
}
export default MenuList