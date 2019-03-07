import React, { Fragment } from 'react';
import { 
    Card, 
    CardImg, 
    CardText, 
    CardBody,
    CardTitle,Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderComments({comments}) {
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
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
        </CardBody>
    </Card>
    )
}

const DishDetail = ({dish, comments}) => {
    console.log(123+JSON.stringify(dish))
    console.log(123456+JSON.stringify(comments))
    if (dish != null) {
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
                        <RenderComments comments={comments} />
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

export default DishDetail;