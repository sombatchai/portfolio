// Web demo entry: React Native Web's Alert.alert does nothing, but MissionLife moves to the next
// screen from inside Alert buttons, so show a browser dialog and run the chosen button's onPress.
import { Alert } from 'react-native';

Alert.alert = (title, message, buttons) => {
  const text = [title, message].filter(Boolean).join('\n\n');
  const list = Array.isArray(buttons) && buttons.length ? buttons : [{ text: 'OK' }];
  if (list.length === 1) { window.alert(text); list[0].onPress && list[0].onPress(); return; }
  const cancel = list.find((b) => b.style === 'cancel') || list[0];
  const ok = list.find((b) => b !== cancel) || list[list.length - 1];
  const chosen = window.confirm(text + '\n\n[OK] = ' + ok.text + '   [Cancel] = ' + cancel.text) ? ok : cancel;
  chosen.onPress && chosen.onPress();
};

require('../index');
