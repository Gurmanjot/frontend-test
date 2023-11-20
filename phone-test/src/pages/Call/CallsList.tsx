import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { PAGINATED_CALLS } from '../../gql/queries';
import { Typography, Spacer, Pagination, Button } from '@aircall/tractor';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import CallItem from './CallItem';
import FilterComponent from './filterComponent';
import { getGroupedItems } from './utils';
import { CallDictionary } from './utils/type';

export const PaginationWrapper = styled.div`
  > div {
    width: inherit;
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
`;

const CALLS_PER_PAGE = 5;

export const CallsListPage = () => {
  const [callsPerPage, setCallsPerPage] = useState(CALLS_PER_PAGE);
  const [calls, setCalls] = useState([]);

  const [sortByDate, setSortByDate] = useState(false);
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const pageQueryParams = search.get('page');
  const [typeFilter, setTypeFilter] = useState<null | string>(null);
  const [directionFilter, setDirectionFilter] = useState<null | string>(null);

  const activePage = !!pageQueryParams ? parseInt(pageQueryParams) : 1;
  const { loading, error, data } = useQuery(PAGINATED_CALLS, {
    variables: {
      offset: (activePage - 1) * callsPerPage,
      limit: callsPerPage
    },
    onCompleted: value => {
      setCalls(value.paginatedCalls.nodes);
    }
  });

  const filteredCalls = calls.filter((call: Call) => {
    return (
      (!typeFilter || call.call_type === typeFilter) &&
      (!directionFilter || call.direction === directionFilter)
    );
  });

  const groupedData: CallDictionary = useMemo(
    () => getGroupedItems(filteredCalls),
    [filteredCalls]
  );

  if (loading) return <p>Loading calls...</p>;
  if (error) return <p>Errooorr!!</p>;
  if (!data) return <p>Not found</p>;

  const { totalCount } = data.paginatedCalls;

  const handlePageChange = (page: number) => {
    navigate(`/calls/?page=${page}`);
  };

  const handlePageSizeChange = (value: number = CALLS_PER_PAGE) => {
    setCallsPerPage(value);
  };

  return (
    <>
      <Typography variant="displayM" textAlign="center" py={3}>
        Calls History
      </Typography>
      <FilterComponent setTypeFilter={setTypeFilter} setDirectionFilter={setDirectionFilter} />
      <Button
        onClick={() => {
          setSortByDate(value => !value);
        }}
      >
        {sortByDate ? 'Reset Date Filter' : 'Sort By Date'}
      </Button>
      <Spacer space="s" direction="vertical" justifyItems="center">
        {filteredCalls.length === 0 ? (
          <h3 style={{ textAlign: 'center' }}>No Calls Available</h3>
        ) : sortByDate ? (
          Object.keys(groupedData)
            .sort()
            .map((item: any) => {
              return (
                <div key={item}>
                  <Typography variant="heading" mb={2}>
                    {item}
                  </Typography>
                  {groupedData[item].map((val: Call, index: number) => {
                    return (
                      <div key={index} style={{ marginBottom: 20 }}>
                        <CallItem call={val} />
                      </div>
                    );
                  })}
                </div>
              );
            })
        ) : (
          filteredCalls.map((call: Call, index) => {
            return <CallItem key={index} call={call} />;
          })
        )}
      </Spacer>
      {totalCount && (
        <PaginationWrapper>
          <Pagination
            activePage={activePage}
            pageSize={callsPerPage}
            onPageChange={handlePageChange}
            recordsTotalCount={totalCount}
            onPageSizeChange={handlePageSizeChange}
          />
        </PaginationWrapper>
      )}
    </>
  );
};
