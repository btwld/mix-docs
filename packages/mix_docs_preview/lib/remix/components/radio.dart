/// RemixRadio Example
///
/// Fortal radio group.

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
    return FortalScope(child: const RadioPreview());
  }
}

class RadioPreview extends StatefulWidget {
  const RadioPreview({super.key});

  @override
  State<RadioPreview> createState() => _RadioPreviewState();
}

class _RadioPreviewState extends State<RadioPreview> {
  String? _selectedValue;

  @override
  Widget build(BuildContext context) {
    return RemixRadioGroup<String>(
      groupValue: _selectedValue,
      onChanged: (value) {
        setState(() {
          _selectedValue = value;
        });
      },
      child: Column(
        crossAxisAlignment: .center,
        spacing: 16,
        mainAxisSize: .min,
        children: [
          Row(
            spacing: 8,
            mainAxisSize: .min,
            children: [
              RemixRadio<String>(
                value: 'option1',
                style: FortalRadioStyles.surface(),
              ),
              const Text('Option 1'),
            ],
          ),
          Row(
            spacing: 8,
            mainAxisSize: .min,
            children: [
              RemixRadio<String>(
                value: 'option2',
                style: FortalRadioStyles.surface(),
              ),
              const Text('Option 2'),
            ],
          ),
        ],
      ),
    );
  }
}
