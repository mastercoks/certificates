import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useCallback, useRef, useState } from 'react'
import {
  FiDownload,
  FiExternalLink,
  FiMinusCircle,
  FiPlus,
  FiSearch,
  FiUsers
} from 'react-icons/fi'

import { useToast } from '../../../providers/toast'
import usePaginatedRequest from '../../../services/usePaginatedRequest'
import Accordion from '../../accordion'
import Button from '../../button'
import Column from '../../column'
import Input from '../../input'
import PaginatedTable from '../../paginatedTable'
import { AddParticipant } from './addParticipant'

export const EventParticipant: React.FC<{ event: any }> = ({ event }) => {
  const { addToast } = useToast()

  const [openModal, setOpenModal] = useState(false)
  const [filters, setFilters] = useState(null)
  const [column, setColumn] = useState('name')
  const [order, setOrder] = useState<'' | 'ASC' | 'DESC'>('ASC')
  const searchFormRef = useRef<FormHandles>()
  const request = usePaginatedRequest<any>({
    url: `events/${event.id}/participants`,
    params:
      filters && order !== ''
        ? Object.assign(filters, { sort_by: column, order_by: order })
        : order !== ''
        ? { sort_by: column, order_by: order }
        : filters
  })

  const handleFilter = useCallback(
    data => {
      !data.search && delete data.search
      request.resetPage()
      setFilters(data)
    },
    [request]
  )

  const handleOrder = useCallback(
    columnSelected => {
      if (column !== columnSelected) {
        setColumn(columnSelected)
        setOrder('ASC')
      } else {
        setOrder(value =>
          value === '' ? 'ASC' : value === 'ASC' ? 'DESC' : ''
        )
      }
    },
    [column]
  )

  //   const [openDeleteModal, setOpenDeleteModal] = useState(false)
  //   const handleSubmitDelete = useCallback(() => {
  //     api
  //       .delete(`event/${event.id}/participant/${activitySelected}`)
  //       .then(resp => {
  //         if (resp?.data?.message === 'event_activity_delete_by_id_success') {
  //           addToast({
  //             title: 'Mensagem',
  //             type: 'success',
  //             description: 'A atividade foi excluída com sucesso.'
  //           })
  //           request.revalidate()
  //           setOpenDeleteModal(false)
  //         }
  //       })
  //       .catch(err => {
  //         console.error(err)
  //         addToast({
  //           title: 'Erro desconhecido',
  //           type: 'error',
  //           description: 'Houve um erro ao deletar a atividade.'
  //         })
  //       })
  //   }, [event, activitySelected, addToast, request])

  return (
    <>
      <Accordion title="Participantes do Evento" open={true} icon={FiUsers}>
        <header>
          <h2></h2>
          <Form ref={searchFormRef} onSubmit={handleFilter}>
            <Input
              name="search"
              placeholder={`Buscar participante no evento`}
              icon={FiSearch}
            />
          </Form>
        </header>
        <PaginatedTable request={request}>
          <thead>
            <tr>
              <th onClick={() => handleOrder('name')}>
                <Column order={order} selected={column === 'name'}>
                  Nome
                </Column>
              </th>
              <th>CPF</th>
              <th>Atividade</th>
              <th>Carga Horária</th>
              <th>Data Início</th>
              <th>Data Fim</th>
              <th>Incluído Em</th>
              <th style={{ width: 32 }} />
            </tr>
          </thead>
          <tbody>
            {request.data?.data?.map(part => (
              <tr key={part.id}>
                <td>{part.name}</td>
                <td>{part.cpf}</td>
                <td>{part.activity}</td>
                <td>{part.workload} h</td>
                <td>{new Date(part.start_date).toLocaleDateString()}</td>
                <td>{new Date(part.end_date).toLocaleDateString()}</td>
                <td>
                  {new Date().toLocaleDateString()} às{' '}
                  {new Date().toLocaleTimeString()}
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                      inline
                      ghost
                      square
                      color="success"
                      size="small"
                      onClick={() => {
                        //   setActivitySelected(act.id)
                        //   setNameActivitySelected(act.name)
                        //   setOpenDeleteModal(true)
                      }}
                    >
                      <FiExternalLink size={20} />
                    </Button>
                    <Button
                      inline
                      ghost
                      square
                      color="info"
                      size="small"
                      onClick={() => {
                        //   setActivitySelected(act.id)
                        //   setNameActivitySelected(act.name)
                        //   setOpenDeleteModal(true)
                      }}
                    >
                      <FiDownload size={20} />
                    </Button>
                    <Button
                      inline
                      ghost
                      square
                      color="danger"
                      size="small"
                      onClick={() => {
                        //   setActivitySelected(act.id)
                        //   setNameActivitySelected(act.name)
                        //   setOpenDeleteModal(true)
                      }}
                    >
                      <FiMinusCircle size={20} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </PaginatedTable>
      </Accordion>
      <AddParticipant event={event} request={request}></AddParticipant>
    </>
  )
}
