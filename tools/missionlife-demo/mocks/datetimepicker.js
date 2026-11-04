// Web stand-in for @react-native-community/datetimepicker (it has no web version):
// a native <input type="date"> that calls onChange(event, date) the same way.
import React from 'react';

const iso = (d) => (d instanceof Date && !isNaN(d) ? d.toISOString().slice(0, 10) : '');

export default function DateTimePicker({ value, onChange, maximumDate, minimumDate }) {
  return React.createElement('input', {
    type: 'date',
    autoFocus: true,
    defaultValue: iso(value),
    max: iso(maximumDate) || undefined,
    min: iso(minimumDate) || undefined,
    style: { fontSize: 16, padding: 10, margin: '8px 0', borderRadius: 10, border: '1px solid #ccc' },
    onChange: (e) => { const d = e.target.value ? new Date(e.target.value + 'T00:00:00') : undefined; onChange && onChange({ type: d ? 'set' : 'dismissed' }, d); },
  });
}
