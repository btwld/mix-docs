/// RemixSelect Example
///
/// Fortal select dropdown with two items — one enabled, one disabled.

library;

import 'package:flutter/material.dart';
import 'package:mix_docs_preview/helpers.dart';
import 'package:remix/remix.dart';

void main() {
  runMixApp(const Example());
}

class Example extends StatelessWidget {
  const Example({super.key});

  @override
  Widget build(BuildContext context) {
    return FortalScope(brightness: .dark, child: const SelectPreview());
  }
}

class SelectPreview extends StatefulWidget {
  const SelectPreview({super.key});

  @override
  State<SelectPreview> createState() => _SelectPreviewState();
}

class _SelectPreviewState extends State<SelectPreview> {
  String? _selectedValue;

  @override
  Widget build(BuildContext context) {
    return RemixSelect(
      trigger: const RemixSelectTrigger(placeholder: 'Text Value'),
      items: [
        RemixSelectItem(
          value: 'option1',
          label: 'Option 1',
          enabled: true,
          style: FortalSelectItemStyles.surface(),
        ),
        RemixSelectItem(
          value: 'option2',
          label: 'Option 2',
          enabled: false,
          style: FortalSelectItemStyles.surface(),
        ),
      ],
      selectedValue: _selectedValue,
      style: FortalSelectStyles.surface(),
      onChanged: (value) {
        setState(() {
          _selectedValue = value;
        });
      },
    );
  }
}
