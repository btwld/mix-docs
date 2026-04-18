/// RemixSlider Example
///
/// Fortal horizontal slider.

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
  double _selectedValue = 0.3;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 300,
      child: RemixSlider(
        value: _selectedValue,
        style: FortalSliderStyles.surface(),
        onChanged: (value) {
          setState(() {
            _selectedValue = value;
          });
        },
      ),
    );
  }
}
