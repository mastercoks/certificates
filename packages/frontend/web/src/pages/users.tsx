import { Form } from '@unform/web'
import Head from 'next/head'
import { useCallback } from 'react'
import {
  FiAward,
  FiEdit,
  FiInfo,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUserPlus,
  FiUsers
} from 'react-icons/fi'

import PageWithLayoutType from '../@types/pageWithLayout'
import Button from '../components/button'
import Card from '../components/card'
import Input from '../components/input'
import PaginatedTable from '../components/paginatedTable'
import withAuth from '../hocs/withAuth'
import DefaultLayout from '../layouts/defaultLayout'
import usePaginatedRequest from '../services/usePaginatedRequest'
import { Container } from '../styles/pages/home'

const Users: React.FC = () => {
  const request = usePaginatedRequest<any>({
    url: 'test/users'
  })

  const handleFilter = useCallback(data => {
    console.log(data)
  }, [])

  return (
    <Container>
      <Head>
        <title>Usuários | Certificados</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiUsers size={24} /> Usuários
          </h1>
          <h2>São pessoas que terão acesso gerencial ao sistema.</h2>
        </div>
        <nav>
          <Button>
            <FiPlus size={20} />
            <span className="hide-md-down">Adicionar Usuário</span>
          </Button>
        </nav>
      </header>
      <Card>
        <header>
          <h2>Usuários Cadastrados</h2>
          <Form onSubmit={handleFilter}>
            <Input name="search" placeholder="Buscar função" icon={FiSearch} />
          </Form>
        </header>
        <PaginatedTable request={request}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Tipo</th>
              <th style={{ width: 32 }} />
            </tr>
          </thead>
          <tbody>
            {request.data?.data?.users?.map(user => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.type}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button inline ghost square color="secondary" size="small">
                      <FiInfo size={20} />
                    </Button>
                    <Button inline ghost square color="secondary" size="small">
                      <FiUserPlus size={20} />
                    </Button>
                    <Button inline ghost square color="primary" size="small">
                      <FiAward size={20} />
                    </Button>
                    <Button inline ghost square color="warning" size="small">
                      <FiEdit size={20} />
                    </Button>
                    <Button inline ghost square color="danger" size="small">
                      <FiTrash2 size={20} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </PaginatedTable>
      </Card>
    </Container>
  )
}

;(Users as PageWithLayoutType).layout = DefaultLayout

export default Users
// export default withAuth(Users)
