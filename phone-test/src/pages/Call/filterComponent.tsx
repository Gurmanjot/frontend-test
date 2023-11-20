import { Box, Select } from '@aircall/tractor';
import { FILTER_BY_DIRECTION_OPTIONS, FILTER_BY_TYPE_OPTIONS } from './constant';

const FilterComponent = ({
  setTypeFilter,
  setDirectionFilter
}: {
  setTypeFilter: (value: string) => void;
  setDirectionFilter: (value: string) => void;
}) => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
      <Select
        placeholder="Type"
        size="small"
        options={FILTER_BY_TYPE_OPTIONS}
        onSelectionChange={val => {
          const filterValue = val?.[0] as string;
          setTypeFilter(filterValue);
        }}
      />
      <Select
        placeholder="Direction"
        size="small"
        onSelectionChange={val => {
          const filterValue = val?.[0] as string;
          setDirectionFilter(filterValue);
        }}
        options={FILTER_BY_DIRECTION_OPTIONS}
      />
    </Box>
  );
};

export default FilterComponent;
