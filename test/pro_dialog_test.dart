import 'package:flutter_test/flutter_test.dart';
import 'package:pro_dialog/pro_dialog.dart';

void main() {
  group('DialogType', () {
    test('all types are defined', () {
      expect(DialogType.values.length, 6);
    });
  });

  group('DialogButton', () {
    test('creates with required params', () {
      final btn = DialogButton(
        text: 'OK',
        onPressed: () {},
      );
      expect(btn.text, 'OK');
      expect(btn.isPrimary, false);
      expect(btn.isLoading, false);
    });

    test('isPrimary defaults to false', () {
      final btn = DialogButton(text: 'OK', onPressed: () {});
      expect(btn.isPrimary, false);
    });
  });

  group('ProDialogTheme', () {
    test('default values are correct', () {
      const theme = ProDialogTheme();
      expect(theme.borderRadius, 24.0);
      expect(theme.iconSize, 48.0);
      expect(theme.maxWidth, 380.0);
      expect(theme.useGlassmorphism, false);
    });
  });
}
