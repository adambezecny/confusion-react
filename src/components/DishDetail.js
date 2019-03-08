import React, { Fragment, Component } from 'react';
import { 
    Card, 
    CardImg, 
    CardText, 
    CardBody,
    CardTitle,Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Label, Col, Row
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderComments({ comments, addComment, dishId }) {
    const commentsList = (
        <ul className="list-unstyled">{
            comments.map(comment => {
                return (
                    <Fragment key={comment.id}>
                        <li>
                        {comment.comment}
                        <br />
                        </li>
                        
                        <li>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </li>
                        <br />
                    </Fragment>
                )
            })                    
        }
        </ul>
    )

    return (
        commentsList
    );
}

function RenderDish({dish}) {
    return (
        <Card>
        <CardImg top src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
        </CardBody>
    </Card>
    )
}

class DishDetail extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }    

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
        // this.toggleModal() //close modal after user clicks ok in alert window
        this.props.addComment(this.props.dish.id, values.rating, values.yourname, values.comment);        
    }
    

    render() {
        const dish = this.props.dish
        const comments = this.props.comments

        if (this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        } else if (dish != null) {
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{dish.name}</h3>
                            <hr />
                        </div>                
                    </div>            
                    <div className="row">
                        <div  className="col-12 col-md-5 m-1">
                            <RenderDish dish={dish} />
                        </div>
                        <div  className="col col-md m-1">
                            <h2>Comments</h2>
                            <RenderComments 
                                comments={comments} 
                            />
                            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                                <ModalBody>
                                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className="form-group">
                                            <Label htmlFor="rating" md={12}>Rating</Label>
                                            <Col>
                                                <Control.select defaultValue="1" className="form-control" model=".rating" id="rating" name="rating">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </Control.select>
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Label htmlFor="yourname" md={12}>Your Name</Label>
                                            <Col>
                                                <Control.text model=".yourname" id="yourname" name="yourname"
                                                    placeholder="Your Name"
                                                    className="form-control"
                                                    validators={{
                                                        required, minLength: minLength(2), maxLength: maxLength(15)
                                                    }}
                                                />
                                                <Errors
                                                    className="text-danger"
                                                    model=".yourname"
                                                    show="touched"
                                                    messages={{
                                                        required: 'Required. ',
                                                        minLength: 'Must be greater than 2 characters.',
                                                        maxLength: 'Must be 15 characters or less.'
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Label htmlFor="rating" md={12}>Comment</Label>
                                            <Col>
                                                <Control.textarea className="form-control" rows="6" model=".comment" id="comment" name="comment" />
                                            </Col>
                                        </Row>
                                        <Row className="form-group">
                                            <Col>
                                                <Button type="submit" color="primary">Submit</Button>
                                            </Col>
                                        </Row>
                                    </LocalForm>
                                </ModalBody>
                            </Modal>                            
                        </div>
                    </div>
                </div>                
            );
        } else {
            return(
                <div className="container"></div>
            );        
    
        }
    }

}

export default DishDetail;