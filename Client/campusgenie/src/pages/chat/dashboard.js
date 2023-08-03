import React from 'react'
import Sidebar from '../../components/layout/sidebar'
import { Container, Row ,Col} from 'react-bootstrap'
import ChatScreen from '../../components/layout/chatscreen'

export const Dashboard = () => {
  
  return (
    <Container>
      <Row>
        <Col xs={2}>
          <Sidebar/>
        </Col>
        <Col xs={5}>
          <ChatScreen />
        </Col>
      </Row>
    </Container>

  )
}
