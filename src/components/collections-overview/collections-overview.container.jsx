import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { selectIsCollectionsFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionOverview from "./collections-overview.component"

// when all we want is pass down props, mapStateToProps is easier/faster/shorter
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionsFetching
});

// use compose from redux for better readability
// this is the same as : connect(mapStateToProps)(WithSpinner(CollectionOverview));
const CollectionOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;