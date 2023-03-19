import React, { FC } from 'react';

import CustomInput from '../common/input';
import { usePlacesWidget } from 'react-google-autocomplete';

interface IInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelected: any;
  error: string;
  className?: string;
}

const AddressInput: FC<IInputProps> = ({
  value,
  onChange,
  error,
  className,
  handleSelected,
}) => {
  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_API_KEY,
    options: {
      types: ['address'],
      componentRestrictions: { country: 'us' },
      bounds: new google.maps.LatLngBounds(
        new google.maps.LatLng(40.73061, -73.935242),
        new google.maps.LatLng(41.599998, -72.699997)
      ),
    },
    inputAutocompleteValue: 'off',
    onPlaceSelected: (place) => {
      const postal_code = place.address_components?.find((el) =>
        el.types.includes('postal_code')
      );
      const state = place.address_components?.find((el) =>
        el.types.includes('administrative_area_level_1')
      );
      const city = place.address_components?.find(
        (el) =>
          el.types.includes('locality') ||
          el.types.includes('administrative_area_level_3')
      );
      handleSelected({
        postal_code: postal_code?.long_name,
        state: state?.short_name,
        city: city?.long_name,
        address: place.formatted_address,
      });
    },
  });

  return (
    <CustomInput
      id='address'
      name='address'
      labelText='Full address'
      value={value}
      onChange={onChange}
      ref={ref as any}
      className={className}
      error={error}
    ></CustomInput>
  );
};

export default AddressInput;
