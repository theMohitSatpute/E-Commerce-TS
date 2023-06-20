import { useSelector } from "react-redux"
import * as userReducer from "../redux/users/user.reducer"
import { RootState } from "../redux/store"
import { TokenUtil } from "../util/TokenUtil"
import SpinnerUI from "../modules/ui/components/spinner/SpinnerUI"
import { Col, Container, Row } from "react-bootstrap"

function AdminRoute({ children }: any) {
    const userState: userReducer.InitialState = useSelector((state: RootState) => {
        return state[userReducer.userFeatureKey]
    })

    let { user, loading } = userState
    const auth = TokenUtil.isLoggedIn()
    return auth && user.isAdmin ? children : <>

        {loading && <SpinnerUI />}
        <Container>
            <Row>
                <Col>
                    <p className="h3 text-danger">You are not access this Page!!!</p>
                </Col>
            </Row>
        </Container>
    </>
}


export default AdminRoute