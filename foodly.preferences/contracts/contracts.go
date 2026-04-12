package contracts
import "fmt"

func Require(cond bool, msg string) {
	if !cond {
		panic(fmt.Sprintf("[PRECONDITION FAILED] %s", msg))
	}
}

func Ensure(cond bool, msg string) {
	if !cond {
		panic(fmt.Sprintf("[POSTCONDITION FAILED] %s", msg))
	}
}

func Invariant(cond bool, msg string) {
	if !cond {
		panic(fmt.Sprintf("[INVARIANT FAILED] %s", msg))
	}
}