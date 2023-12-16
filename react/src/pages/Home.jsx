import React from 'react';
import { host } from '..';

const Home = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    fetch(`${host}categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  return (categories || []).map((category) => (
    <CateogoryAds key={category.id} category={category} />
  ));
};

export const CateogoryAds = ({ category }) => {
  const [ads, setAds] = React.useState([]);

  React.useEffect(() => {
    fetch(`${host}categories/${category.id}/ads`)
      .then((res) => res.json())
      .then((data) => {
        setAds(data);
      });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyItems: 'center',
        marginTop: '2rem',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>{category.name}</h1>
      <div>
        <table className="table" style={{ maxWidth: '1000px' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {ads.length > 0 ? (
              ads.map((ad) => (
                <tr key={ad.id}>
                  <td style={{ width: '300px', textAlign: 'center' }}>
                    {ad.title}
                  </td>
                  <td style={{ width: '300px', textAlign: 'center' }}>
                    {ad.description}
                  </td>
                  <td style={{ width: '300px', textAlign: 'center' }}>
                    {ad.price}
                  </td>
                </tr>
              ))
            ) : (
              <>
                <td></td>
                <td style={{ width: '300px', textAlign: 'center' }}>
                  No ads found
                </td>
                <td></td>
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
