'use client'

import { useEffect, useRef } from "react"
import useActiveList from "./useActiveList"
import { Channel, Members } from "pusher-js"
import pusherClient from "../libs/pusherClient"

const useActiveChannel = () => {
  const { set, add, remove } = useActiveList()
  const channelRef = useRef<Channel | null>(null)

  useEffect(() => {
    if (channelRef.current) return

    const channel = pusherClient.subscribe('presence-messenger')
    channelRef.current = channel

    channel.bind('pusher:subscription_succeeded', (members: Members) => {
      const initialMembers: string[] = []
      members.each((member: Record<string, any>) => initialMembers.push(member.id))
      set(initialMembers)
    })

    channel.bind('pusher:member_added', (member: Record<string, any>) => {
      add(member.id)
    })

    channel.bind('pusher:member_removed', (member: Record<string, any>) => {
      remove(member.id)
    })

    return () => {
      pusherClient.unsubscribe('presence-messenger')
      channelRef.current = null
    }
  }, [])

}

export default useActiveChannel