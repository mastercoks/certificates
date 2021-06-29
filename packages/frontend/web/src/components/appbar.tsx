import { useRouter } from 'next/router'
import { useCallback, useContext, useState } from 'react'
import { FiLogOut, FiMenu } from 'react-icons/fi'

import { useAuth } from '../providers/auth'
import { SidebarContext } from '../providers/sidebar'
import {
  Container,
  Button,
  UserInfo,
  Info,
  Avatar,
  Right
} from '../styles/components/appbar'
import getRole from '../utils/getRole'

const Appbar: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { user, signOut } = useAuth()

  const { toggleActive } = useContext(SidebarContext)

  const handleSignOut = useCallback(() => {
    setLoading(true)
    signOut()
    setLoading(false)
    router.replace('/login')
  }, [router, signOut])

  return (
    <Container>
      <Button onClick={toggleActive}>
        <FiMenu size={24} />
      </Button>
      <Right>
        <UserInfo className="hide-md-down">
          <Info>
            <b>{user?.name}</b>
            <span>{getRole(user?.role)}</span>
          </Info>
          <Avatar>{user?.name.substr(0, 1).toUpperCase()}</Avatar>
        </UserInfo>
        <Button disabled={loading}>
          <FiLogOut size={24} onClick={handleSignOut} />
        </Button>
      </Right>
    </Container>
  )
}

export default Appbar
