/// RemixSwitch Example
///
/// Fortal toggle switch.

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
  bool _selected = false;

  @override
  Widget build(BuildContext context) {
    return RemixSwitch(
      style: FortalSwitchStyles.surface(),
      selected: _selected,
      onChanged: (value) {
        setState(() {
          _selected = value;
        });
      },
    );
  }
}
