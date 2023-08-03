import React from 'react'
import Sidebar from '../../components/layout/sidebar'
import { Container, Row ,Col} from 'react-bootstrap'
import ProfileForm from './profileform'

export const ProfilePage = () => {
  return (
    <Container>
      <Row>
        <Col xs={2}>
          <Sidebar/>
        </Col>
        <Col xs={2}> 
          <ProfileForm/>
        </Col>
      </Row>
    </Container>

  )
}
