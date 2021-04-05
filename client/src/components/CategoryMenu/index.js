import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
//import { useStoreContext } from '../../utils/GlobalState';
import { useSelector, useDispatch } from 'react-redux';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';

import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  //const [state, dispatch] = useStoreContext();
  //The selector function may return any value as a result,
  // not just an object. The return value of the selector will be used as
  // the return value of the useSelector hook.
  const state = useSelector(state => state);
  //In order to dispatch actions from a component, we need access to the store's dispatch function.
  // We get this by calling the useDispatch hook from React-Redux. 
  const dispatch = useDispatch();
  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
        //if categoryData exists or has changed from the response of useQuery, then run dispatch()

    if (categoryData) {
      //execute our dispatch function with our action object indicating the type of
      //action and the the data set our categories state to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if(!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
