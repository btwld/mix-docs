/// RemixCheckbox Example
///
/// Stateful Fortal checkbox.

library;

import 'package:flutter/material.dart';
import 'package:mix_docs_preview/helpers.dart';
import 'package:remix/remix.dart';

void main() {
  runMixApp(FortalScope(child: const Example()));
}

class Example extends StatefulWidget {
  const Example({super.key});

  @override
  State<Example> createState() => _ExampleState();
}

class _ExampleState extends State<Example> {
  bool _isChecked = true;

  @override
  Widget build(BuildContext context) {
    return RemixCheckbox(
      selected: _isChecked,
      onChanged: (value) {
        setState(() {
          _isChecked = value ?? false;
        });
      },
      style: FortalCheckboxStyles.surface(),
    );
  }
}
