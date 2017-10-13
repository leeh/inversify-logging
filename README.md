# Inversify logging

Contextual logging for [inversify](https://github.com/inversify/InversifyJS) powered applications.

## Installation

`
$ npm i inversify-logging
`

## Usage

Activate the logger for all the classes you want to be logged.

```typescript
import {activateLogging} from "inversify-logging";

activateLogging(inversifyContainer).to(TestClass).to(AnotherClass);
```

And log!

```typescript
import {inject} from "inversify";
import {ILogger} from "inversify-logging";

class TestClass {

    constructor(@inject("ILogger") logger: ILogger) {
        logger.info("Logs!"); // This outputs [TestClass] Logs!
    }
}
```


## License

Copyright 2016 Tierra SpA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
