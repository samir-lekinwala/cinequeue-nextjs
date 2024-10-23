import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import SingleSearchItem from '../components/SingleSearchItem'

function InfiniteScrollFunc({
  items,
  fetchData,
  closeSearchBar,
  setSearchBarClick,
  searchBarClick,
  length,
}) {
  console.log('infinite scroll func', length)

  return (
    <div className="absolute h-[70vh] bg-black bg-opacity-80">
      <div id="scrollableDiv" className="h-[70vh] overflow-auto flex flex-col">
        {/*Put the scroll bar always on the bottom*/}
        <InfiniteScroll
          dataLength={length}
          next={fetchData}
          style={{ display: 'flex', flexDirection: 'column' }} //To put endMessage and loader to the top.
          inverse={false} //
          hasMore={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {items.map((item) => (
            <>
              <div
                className="w-[100vw] flex justify-center"
                key={item.id}
                onClick={closeSearchBar}
                // ref={searchItemRef}
              >
                <div className="w-full lg:w-2/3">
                  {item.title ? (
                    <SingleSearchItem
                      data={item}
                      type={'movie'}
                      setSearchBarClick={setSearchBarClick}
                      searchBarClick={searchBarClick}
                    />
                  ) : (
                    <SingleSearchItem
                      data={item}
                      type={'tv'}
                      setSearchBarClick={setSearchBarClick}
                      searchBarClick={searchBarClick}
                    />
                  )}
                </div>
              </div>
            </>
          ))}
        </InfiniteScroll>
      </div>

      {/* <InfiniteScroll
        className={'w-full h-[70vh]'}
        dataLength={length} //This is important field to render the next data
        next={fetchData}
        hasMore={true}
        loader={searchBarClick && items.length > 0 ? <h4>Loading...</h4> : null}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
      > */}
      {/* {items.map((item) => (
        <>
          <div
            key={item.id}
            onClick={closeSearchBar}
            // ref={searchItemRef}
          >
            {item.title ? (
              <SingleSearchItem
                data={item}
                type={'movie'}
                setSearchBarClick={setSearchBarClick}
                searchBarClick={searchBarClick}
              />
            ) : (
              <SingleSearchItem
                data={item}
                type={'tv'}
                setSearchBarClick={setSearchBarClick}
                searchBarClick={searchBarClick}
              />
            )}
          </div>
        </>
      ))} */}
      {/* </InfiniteScroll> */}
    </div>
  )
}

export default InfiniteScrollFunc
